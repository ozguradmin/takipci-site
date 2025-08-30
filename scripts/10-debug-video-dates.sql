-- Debug script to check video dates and data
SELECT 
    video_date, 
    COUNT(*) as record_count,
    MIN(video_title) as sample_title,
    MIN(video_description) as sample_description
FROM rankings 
GROUP BY video_date
ORDER BY video_date DESC;

-- Check for any null video dates
SELECT COUNT(*) as null_video_date_count
FROM rankings 
WHERE video_date IS NULL;

-- Show sample data from each date
SELECT video_date, username, rank, video_title
FROM rankings 
WHERE rank <= 3
ORDER BY video_date DESC, rank ASC;
