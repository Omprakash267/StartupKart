import sqlite3
conn = sqlite3.connect('startupkart.db')
cur = conn.cursor()

cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in cur.fetchall()]
print('Tables:', tables)

for t in ['email_verifications', 'phone_verifications', 'orders', 'order_items']:
    if t in tables:
        cur.execute(f'PRAGMA table_info({t})')
        cols = [(r[1], r[2]) for r in cur.fetchall()]
        print(f'\n{t}:')
        for c in cols:
            print(f'  {c[0]} ({c[1]})')
    else:
        print(f'\n{t}: *** MISSING TABLE ***')

conn.close()
