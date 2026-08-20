"""
predict.py
----------
Prediction module for CareTrack AI.

Loads the trained model, label encoder, and feature columns from disk,
then provides a function to predict diseases from a list of symptom keys.

Step 11 of the training specification: Build a Prediction Function for New Symptoms.
"""

import os
import numpy as np
import joblib
from symptom_mapper import map_frontend_symptoms_to_features

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "Model")

# ── Lazy-loaded globals ───────────────────────────────────────────────────────
_model = None
_label_encoder = None
_feature_columns = None


def _load_model():
    """Load model artifacts from disk (lazy singleton)."""
    global _model, _label_encoder, _feature_columns

    if _model is not None:
        return

    model_path = os.path.join(MODEL_DIR, "best_model.pkl")
    le_path = os.path.join(MODEL_DIR, "label_encoder.pkl")
    fc_path = os.path.join(MODEL_DIR, "feature_columns.pkl")

    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model not found at {model_path}. Run train_model.py first."
        )

    _model = joblib.load(model_path)
    _label_encoder = joblib.load(le_path)
    _feature_columns = joblib.load(fc_path)

    print(f"[predict] Model loaded: {type(_model).__name__}")
    print(f"[predict] Features: {len(_feature_columns)}, Diseases: {len(_label_encoder.classes_)}")


def predict_disease(symptom_keys: list, top_n: int = 5) -> dict:
    """
    Predict the most likely diseases from a list of frontend symptom keys.

    Parameters
    ----------
    symptom_keys : list[str]
        List of symptom keys as used by the frontend (e.g. ["fever", "cough"]).
    top_n : int
        Number of top predictions to return.

    Returns
    -------
    dict with keys:
        - predictions: list of {disease, confidence} dicts
        - symptoms_matched: list of matched symptom keys
        - symptoms_unmatched: list of unmatched symptom keys
        - model_name: name of the model used
    """
    _load_model()

    # Step 11: Convert user inputs into the exact binary vector format
    mapping_result = map_frontend_symptoms_to_features(symptom_keys, _feature_columns)
    feature_dict = mapping_result["features"]
    matched = mapping_result["matched"]
    unmatched = mapping_result["unmatched"]

    # Build the feature vector in the correct column order
    feature_vector = np.array(
        [feature_dict[col] for col in _feature_columns]
    ).reshape(1, -1)

    # Check if any symptoms were actually set
    active_count = int(feature_vector.sum())
    if active_count == 0:
        return {
            "predictions": [],
            "symptoms_matched": matched,
            "symptoms_unmatched": unmatched,
            "active_features": 0,
            "model_name": type(_model).__name__,
            "error": "No symptoms matched any features in the model.",
        }

    # Step 11: Run model.predict_proba() for confidence scores
    if hasattr(_model, "predict_proba"):
        probas = _model.predict_proba(feature_vector)[0]
        # Get top-N indices
        top_indices = np.argsort(probas)[::-1][:top_n]
        predictions = []
        for idx in top_indices:
            disease_name = _label_encoder.inverse_transform([idx])[0]
            confidence = round(float(probas[idx]) * 100, 2)
            if confidence > 0.01:  # Only include if > 0.01%
                predictions.append({
                    "disease": disease_name,
                    "confidence": confidence,
                })
    else:
        # Fallback: just use predict()
        pred = _model.predict(feature_vector)[0]
        disease_name = _label_encoder.inverse_transform([pred])[0]
        predictions = [{"disease": disease_name, "confidence": 100.0}]

    return {
        "predictions": predictions,
        "symptoms_matched": matched,
        "symptoms_unmatched": unmatched,
        "active_features": active_count,
        "model_name": type(_model).__name__,
    }


def get_model_info() -> dict:
    """Return metadata about the loaded model."""
    _load_model()

    import json
    results_path = os.path.join(MODEL_DIR, "training_results.json")
    training_results = {}
    if os.path.exists(results_path):
        with open(results_path) as f:
            training_results = json.load(f)

    best_model_name = training_results.get("best_model", type(_model).__name__)
    best_metrics = training_results.get(best_model_name, {})

    return {
        "model_name": best_model_name,
        "model_type": type(_model).__name__,
        "num_features": len(_feature_columns),
        "num_diseases": len(_label_encoder.classes_),
        "accuracy": best_metrics.get("accuracy"),
        "precision": best_metrics.get("precision"),
        "recall": best_metrics.get("recall"),
        "f1_score": best_metrics.get("f1_score"),
        "train_time_seconds": best_metrics.get("train_time_seconds"),
        "all_models": {
            k: v for k, v in training_results.items()
            if isinstance(v, dict) and "accuracy" in v
        },
    }


def get_available_symptoms() -> list:
    """Return the list of feature column names the model was trained on."""
    _load_model()
    return list(_feature_columns)


# ── Quick test ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Testing prediction with sample symptoms...")
    result = predict_disease(["fever", "cough", "sore_throat", "headache", "fatigue"])
    print(f"\nMatched symptoms: {result['symptoms_matched']}")
    print(f"Unmatched symptoms: {result['symptoms_unmatched']}")
    print(f"Active features: {result['active_features']}")
    print(f"Model: {result['model_name']}")
    print(f"\nTop predictions:")
    for p in result["predictions"]:
        print(f"  {p['disease']:40s}  {p['confidence']:.2f}%")
