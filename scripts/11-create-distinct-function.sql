-- Create a PostgreSQL function to get distinct video dates more reliably
CREATE OR REPLACE FUNCTION get_distinct_video_dates()
RETURNS TABLE(video_date DATE) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT r.video_date
  FROM rankings r
  WHERE r.video_date IS NOT NULL
  ORDER BY r.video_date DESC;
END;
$$ LANGUAGE plpgsql;
