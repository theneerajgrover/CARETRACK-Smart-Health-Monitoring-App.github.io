"""
db_setup.py
-----------
One-time database setup for CareTrack AI.

Creates the 'caretrack_ai' database, all tables, and seeds the symptoms
and diseases lookup tables from the training dataset.

Usage:
    python db_setup.py
"""

import os
import sys
import psycopg2
from psycopg2 import sql
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

# -- Config --------------------------------------------------------------------
DB_PASSWORD = os.getenv("DB_PASSWORD", "Neeraj@0069")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = "caretrack_ai"
DB_USER = os.getenv("DB_USER", "postgres")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "Dataset", "data.csv")


def create_database():
    """Create the caretrack_ai database if it doesn't exist."""
    print("[1/4] Creating database...")
    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname="postgres"
    )
    conn.autocommit = True
    cur = conn.cursor()

    cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (DB_NAME,))
    if cur.fetchone():
        print(f"  Database '{DB_NAME}' already exists.")
    else:
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(DB_NAME)))
        print(f"  [OK] Created database '{DB_NAME}'.")

    cur.close()
    conn.close()


def create_tables():
    """Create all tables."""
    print("\n[2/4] Creating tables...")
    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME
    )
    cur = conn.cursor()

    statements = [
        # Users table
        """
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            created_at TIMESTAMP DEFAULT NOW()
        );
        """,
        # Symptoms lookup table (numeric ID -> symptom info)
        """
        CREATE TABLE IF NOT EXISTS symptoms (
            id SERIAL PRIMARY KEY,
            key VARCHAR(255) UNIQUE NOT NULL,
            label VARCHAR(255) NOT NULL,
            category VARCHAR(100)
        );
        """,
        # Diseases lookup table (numeric ID -> disease name)
        """
        CREATE TABLE IF NOT EXISTS diseases (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """,
        # Refresh tokens table
        """
        CREATE TABLE IF NOT EXISTS refresh_tokens (
            id SERIAL PRIMARY KEY,
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            token VARCHAR(512) UNIQUE NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """,
        # Predictions table (stores patient info + symptom IDs as integer array)
        """
        CREATE TABLE IF NOT EXISTS predictions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id) ON DELETE SET NULL,
            patient_name VARCHAR(255),
            patient_age VARCHAR(10),
            patient_gender VARCHAR(20),
            patient_dob VARCHAR(20),
            patient_blood_group VARCHAR(10),
            patient_height VARCHAR(20),
            patient_weight VARCHAR(20),
            patient_email VARCHAR(255),
            patient_phone VARCHAR(50),
            symptom_ids INTEGER[] NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """,
        # Prediction results table (top 5 diseases with confidence, remedies, warnings)
        """
        CREATE TABLE IF NOT EXISTS prediction_results (
            id SERIAL PRIMARY KEY,
            prediction_id UUID REFERENCES predictions(id) ON DELETE CASCADE,
            disease_id INTEGER REFERENCES diseases(id),
            confidence_pct DECIMAL(5,2) NOT NULL,
            rank INTEGER NOT NULL,
            risk_level VARCHAR(20) DEFAULT 'low',
            remedies_text TEXT,
            warning_text TEXT
        );
        """,
        # Indexes
        """CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON predictions(user_id);""",
        """CREATE INDEX IF NOT EXISTS idx_prediction_results_prediction_id ON prediction_results(prediction_id);""",
        """CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);""",
        """CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);""",
    ]

    for stmt in statements:
        cur.execute(stmt)

    conn.commit()
    cur.close()
    conn.close()
    print("  [OK] All tables created.")


def seed_symptoms():
    """Seed the symptoms table from the dataset columns."""
    print("\n[3/4] Seeding symptoms table...")
    # Read just the header to get symptom column names
    df = pd.read_csv(DATASET_PATH, nrows=0)
    df.columns = df.columns.str.strip()
    symptom_cols = list(df.columns[1:])  # Skip 'diseases' column

    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME
    )
    cur = conn.cursor()

    # Check if already seeded
    cur.execute("SELECT COUNT(*) FROM symptoms")
    count = cur.fetchone()[0]
    if count > 0:
        print(f"  Symptoms table already has {count} entries. Skipping.")
        cur.close()
        conn.close()
        return

    # Insert each symptom
    for i, col_key in enumerate(symptom_cols):
        # Generate a human-readable label from the key
        label = col_key.replace("_", " ").title()
        # Assign a rough category based on position (simplified)
        category = "general"
        cur.execute(
            "INSERT INTO symptoms (key, label, category) VALUES (%s, %s, %s) ON CONFLICT (key) DO NOTHING",
            (col_key, label, category),
        )

    conn.commit()
    cur.execute("SELECT COUNT(*) FROM symptoms")
    final_count = cur.fetchone()[0]
    cur.close()
    conn.close()
    print(f"  [OK] Seeded {final_count} symptoms.")


def seed_diseases():
    """Seed the diseases table from the dataset's disease column."""
    print("\n[4/4] Seeding diseases table...")
    df = pd.read_csv(DATASET_PATH, usecols=[0])
    df.columns = df.columns.str.strip()
    disease_col = df.columns[0]
    unique_diseases = sorted(df[disease_col].str.strip().unique())

    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME
    )
    cur = conn.cursor()

    # Check if already seeded
    cur.execute("SELECT COUNT(*) FROM diseases")
    count = cur.fetchone()[0]
    if count > 0:
        print(f"  Diseases table already has {count} entries. Skipping.")
        cur.close()
        conn.close()
        return

    for disease_name in unique_diseases:
        cur.execute(
            "INSERT INTO diseases (name) VALUES (%s) ON CONFLICT (name) DO NOTHING",
            (disease_name,),
        )

    conn.commit()
    cur.execute("SELECT COUNT(*) FROM diseases")
    final_count = cur.fetchone()[0]
    cur.close()
    conn.close()
    print(f"  [OK] Seeded {final_count} diseases.")


def main():
    print("=" * 60)
    print("  CareTrack AI -- Database Setup")
    print("=" * 60)

    create_database()
    create_tables()
    seed_symptoms()
    seed_diseases()

    print("\n" + "=" * 60)
    print("  [OK] Database setup complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
