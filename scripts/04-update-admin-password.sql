-- Update admin password hash for better security
-- This is a simple hash for demo purposes - in production use proper bcrypt
UPDATE admin_users 
SET password_hash = '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq'
WHERE username = 'admin';
