-- Added additional database indexes for better query performance
-- Index for video date ordering (most common query)
CREATE INDEX IF NOT EXISTS idx_rankings_video_date_desc ON rankings(video_date DESC);

-- Index for username searches (case insensitive)
CREATE INDEX IF NOT EXISTS idx_rankings_username_lower ON rankings(LOWER(username));

-- Index for rank ordering within video dates
CREATE INDEX IF NOT EXISTS idx_rankings_video_date_rank_asc ON rankings(video_date, rank ASC);

-- Partial index for latest video queries
CREATE INDEX IF NOT EXISTS idx_rankings_latest_video ON rankings(video_date DESC, rank ASC) 
WHERE video_date IS NOT NULL;

-- Index for profile picture URL existence checks
CREATE INDEX IF NOT EXISTS idx_rankings_has_profile_pic ON rankings(username) 
WHERE profile_picture_url IS NOT NULL;

-- Analyze tables to update statistics for query planner
ANALYZE rankings;
