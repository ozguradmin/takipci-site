-- SQLite compatible database setup for development

-- Create the rankings table to store current user rankings
CREATE TABLE IF NOT EXISTS rankings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  profile_picture_url TEXT,
  rank INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create index on rank for faster sorting
CREATE INDEX IF NOT EXISTS idx_rankings_rank ON rankings(rank);
CREATE INDEX IF NOT EXISTS idx_rankings_created_at ON rankings(created_at);

-- Create the ranking_history table to track changes over time
CREATE TABLE IF NOT EXISTS ranking_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  profile_picture_url TEXT,
  rank INTEGER NOT NULL,
  recorded_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create index on recorded_at for faster historical queries
CREATE INDEX IF NOT EXISTS idx_ranking_history_recorded_at ON ranking_history(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_history_username ON ranking_history(username);

-- Create the admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create the videos table to store video information
CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at for videos
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at);
