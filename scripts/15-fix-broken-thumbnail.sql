-- Fix the broken ibb.co URL with a working placeholder
UPDATE rankings 
SET video_thumbnail_url = '/placeholder.svg?height=400&width=600'
WHERE video_thumbnail_url LIKE '%ibb.co%GQxrvxg3%';

-- Verify the update
SELECT video_date, video_title, video_thumbnail_url 
FROM rankings 
WHERE video_thumbnail_url LIKE '%placeholder%'
ORDER BY video_date DESC;
