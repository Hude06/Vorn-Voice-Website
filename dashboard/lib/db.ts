import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

let database: Database.Database | undefined;

function getDatabasePath() {
  const configuredPath = process.env.DASHBOARD_DB_PATH;

  if (!configuredPath) {
    return path.join(process.cwd(), "data", "downloads.db");
  }

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(process.cwd(), configuredPath);
}

function initialize(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS download_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_key TEXT NOT NULL,
      destination_url TEXT NOT NULL,
      request_host TEXT,
      referer TEXT,
      user_agent TEXT,
      ip_hash TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_download_events_created_at
      ON download_events (created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_download_events_product_key
      ON download_events (product_key);

    CREATE INDEX IF NOT EXISTS idx_download_events_ip_hash
      ON download_events (ip_hash);
  `);
}

export function getDb() {
  if (database) {
    return database;
  }

  const dbPath = getDatabasePath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  database = new Database(dbPath);
  initialize(database);

  return database;
}
