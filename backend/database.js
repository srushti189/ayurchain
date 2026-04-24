import Database from 'better-sqlite3';

const db = new Database('ayurchain.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('farmer', 'collector', 'processor', 'manufacturer', 'consumer'))
  )
`);

export default db;