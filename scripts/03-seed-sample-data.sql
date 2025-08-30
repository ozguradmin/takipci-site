-- Insert sample ranking data
INSERT INTO rankings (username, profile_picture_url, rank) VALUES
('kullanici1', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face', 1),
('kullanici2', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 2),
('kullanici3', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 3),
('kullanici4', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 4),
('kullanici5', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 5)
ON CONFLICT (username) DO NOTHING;

-- Insert sample video data
INSERT INTO videos (title, description, video_url, thumbnail_url) VALUES
('En İyi Takipçi Sıralaması', 'Bu videoda en iyi takipçi sıralamasını gösteriyoruz', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop'),
('Haftalık Sıralama Güncellemesi', 'Bu haftanın sıralama değişikliklerini inceleyelim', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&h=200&fit=crop')
ON CONFLICT DO NOTHING;
