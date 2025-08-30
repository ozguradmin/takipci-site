-- Removed datetime() function calls for Turso compatibility
-- Using simple INSERT statements for better compatibility
-- Converting sample data for Turso
-- Insert sample ranking data
INSERT INTO rankings (username, profile_picture_url, rank) VALUES
('user1', 'https://i.pravatar.cc/150?img=1', 1);

INSERT INTO rankings (username, profile_picture_url, rank) VALUES
('user2', 'https://i.pravatar.cc/150?img=2', 2);

INSERT INTO rankings (username, profile_picture_url, rank) VALUES
('user3', 'https://i.pravatar.cc/150?img=3', 3);

INSERT INTO rankings (username, profile_picture_url, rank) VALUES
('user4', 'https://i.pravatar.cc/150?img=4', 4);

INSERT INTO rankings (username, profile_picture_url, rank) VALUES
('user5', 'https://i.pravatar.cc/150?img=5', 5);

-- Insert sample video data
INSERT INTO videos (title, description, video_url, thumbnail_url) VALUES
('29.09.2025', 'Video açıklaması burada', 'https://example.com/video1', 'https://i.ibb.co/GQxrvxg3/Ads-z.png');

INSERT INTO videos (title, description, video_url, thumbnail_url) VALUES
('28.09.2025', 'Başka bir video açıklaması', 'https://example.com/video2', 'https://i.ibb.co/GQxrvxg3/Ads-z.png');

INSERT INTO videos (title, description, video_url, thumbnail_url) VALUES
('27.09.2025', 'Üçüncü video açıklaması', 'https://example.com/video3', 'https://i.ibb.co/GQxrvxg3/Ads-z.png');

-- Insert sample ranking history
INSERT INTO ranking_history (username, profile_picture_url, rank) VALUES
('user1', 'https://i.pravatar.cc/150?img=1', 1);

INSERT INTO ranking_history (username, profile_picture_url, rank) VALUES
('user2', 'https://i.pravatar.cc/150?img=2', 2);

INSERT INTO ranking_history (username, profile_picture_url, rank) VALUES
('user3', 'https://i.pravatar.cc/150?img=3', 3);
