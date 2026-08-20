"""
test_backend.py
----------------
End-to-end verification script for CareTrack AI Backend.
Tests:
  1. Database connection & counts
  2. Model loading & prediction
  3. User registration & JWT generation (bcrypt + tokens)
  4. User login & token verification
  5. Prediction API with DB storage (symptom IDs as integer array)
  6. Gemini remedy generation & high-risk warnings
  7. Prediction history retrieval
"""

import os
import sys
import json
from dotenv import load_dotenv

load_dotenv()

# Step 1: Check Database
print("\n[Test 1] Testing Database Connection...")
from database import query, execute
user_count = query("SELECT COUNT(*) FROM users", fetch_one=True)["count"]
symptom_count = query("SELECT COUNT(*) FROM symptoms", fetch_one=True)["count"]
disease_count = query("SELECT COUNT(*) FROM diseases", fetch_one=True)["count"]
print(f"  Users: {user_count}")
print(f"  Symptoms in DB: {symptom_count} (Expected 377)")
print(f"  Diseases in DB: {disease_count} (Expected 713)")
assert symptom_count == 377, "Expected 377 symptoms"
assert disease_count == 713, "Expected 713 diseases"
print("  [OK] Database verification passed!")

# Step 2: Test Model & Prediction Engine
print("\n[Test 2] Testing Model & Prediction Engine...")
from predict import predict_disease, get_model_info
info = get_model_info()
print(f"  Model Loaded: {info['model_name']} (Accuracy: {info['accuracy']}, F1: {info['f1_score']})")
test_symptoms = ["fever", "cough", "headache", "fatigue", "sore_throat"]
pred_res = predict_disease(test_symptoms, top_n=5)
print(f"  Input Symptoms: {test_symptoms}")
print(f"  Matched Symptoms: {pred_res['symptoms_matched']}")
print(f"  Top 5 Predicted Diseases:")
for i, p in enumerate(pred_res["predictions"], 1):
    print(f"    {i}. {p['disease']:35s} {p['confidence']:6.2f}%")
assert len(pred_res["predictions"]) > 0, "Expected predictions"
print("  [OK] Model prediction passed!")

# Step 3: Test Gemini Service
print("\n[Test 3] Testing Gemini Remedies & Doctor Warning...")
from gemini_service import generate_remedies_and_warnings
test_preds = [
    {"disease": "common cold", "confidence": 78.5, "rank": 1, "disease_id": 10},
    {"disease": "heart attack", "confidence": 85.0, "rank": 2, "disease_id": 20},
]
enriched = generate_remedies_and_warnings(test_preds)
for p in enriched:
    print(f"  Disease: {p['disease']} ({p['confidence']}%) -> Risk: {p['risk_level']}")
    if p['remedies_text']:
        print(f"    Remedies: {p['remedies_text'][:100]}...")
    if p['warning_text']:
        print(f"    Warning:  {p['warning_text']}")
assert enriched[0]["remedies_text"] is not None, "Expected remedies for common cold"
assert enriched[1]["warning_text"] is not None, "Expected warning for high-risk disease"
print("  [OK] Gemini & warning logic passed!")

# Step 4: Test Flask App APIs
print("\n[Test 4] Testing Flask API with TestClient...")
from app import app
client = app.test_client()

# Health check
res = client.get("/api/health")
assert res.status_code == 200
print("  GET /api/health -> 200 OK")

# Symptoms endpoint
res = client.get("/api/symptoms")
assert res.status_code == 200
s_data = res.get_json()
assert s_data["count"] == 377
print(f"  GET /api/symptoms -> 200 OK ({s_data['count']} symptoms with numeric IDs)")

# Diseases endpoint
res = client.get("/api/diseases")
assert res.status_code == 200
d_data = res.get_json()
assert d_data["count"] == 713
print(f"  GET /api/diseases -> 200 OK ({d_data['count']} diseases with numeric IDs)")

# Auth Register
test_email = "test_patient_verify@caretrack.ai"
# Clean up any previous test user
execute("DELETE FROM users WHERE email = %s", (test_email,))

res = client.post("/api/auth/register", json={
    "name": "Alex Smith",
    "email": test_email,
    "password": "SecurePassword123!",
    "phone": "+1234567890",
})
assert res.status_code == 201, f"Register failed: {res.get_data(as_text=True)}"
reg_data = res.get_json()
access_token = reg_data["access_token"]
refresh_token = reg_data["refresh_token"]
print(f"  POST /api/auth/register -> 201 Created (Access & Refresh tokens generated)")

# Auth Login
res = client.post("/api/auth/login", json={
    "email": test_email,
    "password": "SecurePassword123!",
})
assert res.status_code == 200
login_data = res.get_json()
assert "access_token" in login_data
print("  POST /api/auth/login -> 200 OK (Bcrypt hash verified)")

# Auth Refresh
res = client.post("/api/auth/refresh", json={
    "refresh_token": refresh_token,
})
assert res.status_code == 200
print("  POST /api/auth/refresh -> 200 OK (New access token issued)")

# Predict Endpoint (Authenticated)
res = client.post(
    "/api/predict",
    headers={"Authorization": f"Bearer {access_token}"},
    json={
        "symptoms": ["fever", "cough", "headache", "fatigue"],
        "patient_details": {
            "name": "Alex Smith",
            "age": "32",
            "gender": "male",
            "dob": "1994-05-12",
            "email": test_email,
            "phone": "+1234567890",
        },
    },
)
assert res.status_code == 200, f"Predict failed: {res.get_data(as_text=True)}"
pred_api_data = res.get_json()
print(f"  POST /api/predict -> 200 OK")
print(f"    Prediction ID: {pred_api_data['prediction_id']}")
print(f"    Numeric Symptom IDs: {pred_api_data['symptom_ids']}")
print(f"    Top Findings:")
for p in pred_api_data["predictions"]:
    print(f"      - Rank {p['rank']}: {p['disease']} (ID: {p['disease_id']}, {p['confidence']}%, Risk: {p['risk_level']})")

# Past Predictions Endpoint (Authenticated)
res = client.get(
    "/api/predictions",
    headers={"Authorization": f"Bearer {access_token}"},
)
assert res.status_code == 200
history = res.get_json()["predictions"]
assert len(history) >= 1
print(f"  GET /api/predictions -> 200 OK ({len(history)} past predictions found)")

# Single Prediction Detail Endpoint (Authenticated)
pred_id = pred_api_data["prediction_id"]
res = client.get(
    f"/api/predictions/{pred_id}",
    headers={"Authorization": f"Bearer {access_token}"},
)
assert res.status_code == 200
detail = res.get_json()
assert detail["id"] == pred_id
print(f"  GET /api/predictions/{pred_id} -> 200 OK (Full detail retrieved)")

print("\n" + "=" * 60)
print("  ALL BACKEND TESTS PASSED WITH 100% SUCCESS!")
print("=" * 60)
