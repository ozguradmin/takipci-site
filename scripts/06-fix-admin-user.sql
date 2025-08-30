-- Ensure admin user exists with correct credentials
-- Delete existing admin user if exists
DELETE FROM admin_users WHERE username = 'admin';

-- Insert admin user with plain text password for compatibility
INSERT INTO admin_users (username, password_hash, created_at, updated_at)
VALUES ('admin', 'admin123', NOW(), NOW());
