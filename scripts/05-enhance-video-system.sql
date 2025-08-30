-- Add video_date and enhance video system
-- Drop existing tables to recreate with better structure
DROP TABLE IF EXISTS ranking_history CASCADE;
DROP TABLE IF EXISTS rankings CASCADE;
DROP TABLE IF EXISTS videos CASCADE;

-- Create enhanced videos table with date support
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  video_date DATE NOT NULL UNIQUE,
  title VARCHAR(500),
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  thumbnail_file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video_rankings table to store rankings for each video
CREATE TABLE IF NOT EXISTS video_rankings (
  id SERIAL PRIMARY KEY,
  video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
  username VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  rank INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(video_id, username),
  UNIQUE(video_id, rank)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_date ON videos(video_date DESC);
CREATE INDEX IF NOT EXISTS idx_video_rankings_video_id ON video_rankings(video_id);
CREATE INDEX IF NOT EXISTS idx_video_rankings_rank ON video_rankings(video_id, rank);
CREATE INDEX IF NOT EXISTS idx_video_rankings_username ON video_rankings(username);

-- Insert sample video data
INSERT INTO videos (video_date, title, description, thumbnail_url) VALUES
('2025-08-19', '19.08.2025 tarihinde paylaşılan video', 'Sıralamaları görmek için tıklayın', '/placeholder.svg?height=200&width=300'),
('2025-08-18', '18.08.2025 tarihinde paylaşılan video', 'Sıralamaları görmek için tıklayın', '/placeholder.svg?height=200&width=300')
ON CONFLICT (video_date) DO NOTHING;

-- Insert sample ranking data for the latest video
INSERT INTO video_rankings (video_id, username, profile_picture_url, rank) 
SELECT 
  v.id,
  'kullanici' || generate_series(1, 10),
  'https://images.unsplash.com/photo-' || 
  CASE generate_series(1, 10) % 5
    WHEN 1 THEN '1535713875002-d1d0cf377fde'
    WHEN 2 THEN '1494790108755-2616b612b786'
    WHEN 3 THEN '1507003211169-0a1dd7228f2d'
    WHEN 4 THEN '1438761681033-6461ffad8d80'
    ELSE '1472099645785-5658abf4ff4e'
  END || '?w=150&h=150&fit=crop&crop=face',
  generate_series(1, 10)
FROM videos v 
WHERE v.video_date = '2025-08-19'
ON CONFLICT (video_id, username) DO NOTHING;
