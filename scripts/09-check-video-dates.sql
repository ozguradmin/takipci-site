-- Check all unique video dates in rankings table
SELECT DISTINCT video_date, COUNT(*) as record_count
FROM rankings 
ORDER BY video_date DESC;

-- Also check if there are any records with null video_date
SELECT COUNT(*) as null_video_date_count
FROM rankings 
WHERE video_date IS NULL;
