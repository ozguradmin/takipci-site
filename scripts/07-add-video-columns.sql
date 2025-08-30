-- Add video metadata columns to rankings table if they don't exist
ALTER TABLE rankings 
ADD COLUMN IF NOT EXISTS video_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS video_title TEXT,
ADD COLUMN IF NOT EXISTS video_description TEXT,
ADD COLUMN IF NOT EXISTS video_thumbnail_url TEXT;

-- Create index for better performance on video_date queries
CREATE INDEX IF NOT EXISTS idx_rankings_video_date ON rankings(video_date);
