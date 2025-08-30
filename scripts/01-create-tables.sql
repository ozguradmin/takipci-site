-- Create the rankings table to store current user rankings
CREATE TABLE IF NOT EXISTS rankings (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  profile_picture_url TEXT,
  rank INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on rank for faster sorting
CREATE INDEX IF NOT EXISTS idx_rankings_rank ON rankings(rank);

-- Create the ranking_history table to track changes over time
CREATE TABLE IF NOT EXISTS ranking_history (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  rank INTEGER NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on recorded_at for faster historical queries
CREATE INDEX IF NOT EXISTS idx_ranking_history_recorded_at ON ranking_history(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_history_username ON ranking_history(username);

-- Create the admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the videos table to store video information
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
