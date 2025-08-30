-- Insert default admin user (username: admin, password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq')
ON CONFLICT (username) DO NOTHING;
