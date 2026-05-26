import sqlite3
import glob

# Find all SQLite databases
dbs = glob.glob("./**/*.db", recursive=True) + glob.glob("*.db")
print("Found databases:", dbs)

for db_path in set(dbs):
    print(f"\n--- {db_path} ---")
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [r[0] for r in cur.fetchall()]
    print("Tables:", tables)

    if "users" in tables:
        cur.execute("PRAGMA table_info(users)")
        col_names = [r[1] for r in cur.fetchall()]
        print("User columns:", col_names)

        additions = [
            ("telegram_chat_id", "VARCHAR"),
            ("telegram_username", "VARCHAR"),
            ("telegram_linked_at", "DATETIME"),
            ("telegram_notifications_enabled", "BOOLEAN DEFAULT 1"),
        ]

        for col, typ in additions:
            if col not in col_names:
                try:
                    cur.execute(f"ALTER TABLE users ADD COLUMN {col} {typ}")
                    print(f"  ✅ Added: {col}")
                except Exception as e:
                    print(f"  ⚠️  {col}: {e}")
            else:
                print(f"  ✓ Already exists: {col}")

        conn.commit()
    conn.close()

print("\n✅ Migration complete.")
