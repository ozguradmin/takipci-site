-- Remove unique constraint from username to allow same users in different video dates
ALTER TABLE rankings DROP CONSTRAINT IF EXISTS rankings_username_key;

-- Add composite unique constraint for username + video_date combination
ALTER TABLE rankings ADD CONSTRAINT rankings_username_video_date_key UNIQUE (username, video_date);
