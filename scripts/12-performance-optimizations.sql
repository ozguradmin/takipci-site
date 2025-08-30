-- Critical performance optimizations to reduce CPU and memory usage

-- Add composite index for the most common query pattern
CREATE INDEX IF NOT EXISTS idx_rankings_video_date_rank ON rankings(video_date DESC, rank ASC);

-- Add composite index for username searches (most common user action)
CREATE INDEX IF NOT EXISTS idx_rankings_username_video_date ON rankings(username, video_date DESC);

-- Add index for latest video queries
CREATE INDEX IF NOT EXISTS idx_rankings_video_date_desc ON rankings(video_date DESC) WHERE video_date IS NOT NULL;

-- Optimize the distinct video dates function with better performance
CREATE OR REPLACE FUNCTION get_distinct_video_dates_optimized()
RETURNS TABLE(video_date DATE, video_title TEXT, video_description TEXT, video_thumbnail_url TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (r.video_date) 
    r.video_date,
    r.video_title,
    r.video_description,
    r.video_thumbnail_url
  FROM rankings r
  WHERE r.video_date IS NOT NULL
  ORDER BY r.video_date DESC, r.id ASC;
END;
$$ LANGUAGE plpgsql;

-- Create a function for fast username search
CREATE OR REPLACE FUNCTION search_user_rankings(search_username TEXT)
RETURNS TABLE(
  username VARCHAR(255),
  rank INTEGER,
  video_date DATE,
  video_title TEXT,
  profile_picture_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.username,
    r.rank,
    r.video_date,
    r.video_title,
    r.profile_picture_url
  FROM rankings r
  WHERE r.username ILIKE search_username || '%'
  ORDER BY r.video_date DESC, r.rank ASC
  LIMIT 50; -- Limit results to prevent excessive memory usage
END;
$$ LANGUAGE plpgsql;
