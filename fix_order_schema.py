import sqlite3

conn = sqlite3.connect('startupkart.db')
cur = conn.cursor()

# Fix order_items: add missing columns
cur.execute("PRAGMA table_info(order_items)")
existing_order_item_cols = [r[1] for r in cur.fetchall()]
print("Current order_items cols:", existing_order_item_cols)

order_item_additions = [
    ("gst_rate", "FLOAT DEFAULT 0.0"),
    ("gst_amount", "FLOAT DEFAULT 0.0"),
    ("total_price", "FLOAT DEFAULT 0.0"),
    ("product_name", "VARCHAR"),
]
for col, typ in order_item_additions:
    if col not in existing_order_item_cols:
        cur.execute(f"ALTER TABLE order_items ADD COLUMN {col} {typ}")
        print(f"  Added order_items.{col}")
    else:
        print(f"  OK order_items.{col}")

# Fix email_verifications: add missing columns
cur.execute("PRAGMA table_info(email_verifications)")
existing_ev_cols = [r[1] for r in cur.fetchall()]
print("\nCurrent email_verifications cols:", existing_ev_cols)

ev_additions = [
    ("attempts", "INTEGER DEFAULT 0"),
]
for col, typ in ev_additions:
    if col not in existing_ev_cols:
        cur.execute(f"ALTER TABLE email_verifications ADD COLUMN {col} {typ}")
        print(f"  Added email_verifications.{col}")
    else:
        print(f"  OK email_verifications.{col}")

# Fix phone_verifications: add missing columns
cur.execute("PRAGMA table_info(phone_verifications)")
existing_pv_cols = [r[1] for r in cur.fetchall()]
print("\nCurrent phone_verifications cols:", existing_pv_cols)

pv_additions = [
    ("attempts", "INTEGER DEFAULT 0"),
]
for col, typ in pv_additions:
    if col not in existing_pv_cols:
        cur.execute(f"ALTER TABLE phone_verifications ADD COLUMN {col} {typ}")
        print(f"  Added phone_verifications.{col}")
    else:
        print(f"  OK phone_verifications.{col}")

conn.commit()
conn.close()
print("\nDone.")
