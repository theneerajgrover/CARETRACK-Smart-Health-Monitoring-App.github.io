"""
database.py
-----------
PostgreSQL connection pool and helper functions for CareTrack AI.
"""

import os
import psycopg2
from psycopg2 import pool, extras
from dotenv import load_dotenv

load_dotenv()

# -- Connection Pool -----------------------------------------------------------
_pool = None


def _get_dsn():
    """Build DSN from individual env vars or DATABASE_URL."""
    return {
        "host": os.getenv("DB_HOST", "localhost"),
        "port": os.getenv("DB_PORT", "5432"),
        "user": os.getenv("DB_USER", "postgres"),
        "password": os.getenv("DB_PASSWORD", "Neeraj@0069"),
        "dbname": os.getenv("DB_NAME", "caretrack_ai"),
    }


def get_pool():
    """Get or create the connection pool."""
    global _pool
    if _pool is None or _pool.closed:
        _pool = pool.ThreadedConnectionPool(1, 10, **_get_dsn())
    return _pool


def get_conn():
    """Get a connection from the pool."""
    return get_pool().getconn()


def put_conn(conn):
    """Return a connection to the pool."""
    get_pool().putconn(conn)


def query(sql, params=None, fetch_one=False, fetch_all=False):
    """Execute a query and optionally fetch results."""
    conn = get_conn()
    try:
        with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            cur.execute(sql, params)
            if fetch_one:
                result = cur.fetchone()
            elif fetch_all:
                result = cur.fetchall()
            else:
                result = None
            conn.commit()
            return result
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        put_conn(conn)


def execute(sql, params=None):
    """Execute a statement (INSERT/UPDATE/DELETE) and return affected rows."""
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            conn.commit()
            return cur.rowcount
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        put_conn(conn)


def execute_returning(sql, params=None):
    """Execute a statement with RETURNING clause and return the result."""
    conn = get_conn()
    try:
        with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            cur.execute(sql, params)
            result = cur.fetchone()
            conn.commit()
            return result
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        put_conn(conn)
