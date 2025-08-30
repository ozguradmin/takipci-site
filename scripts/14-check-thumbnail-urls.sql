-- Check current thumbnail URLs in database
SELECT video_date, video_title, video_thumbnail_url 
FROM rankings 
WHERE video_thumbnail_url IS NOT NULL 
AND video_thumbnail_url != ''
GROUP BY video_date, video_title, video_thumbnail_url
ORDER BY video_date DESC;
