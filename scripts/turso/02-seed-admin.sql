-- Using simple INSERT with proper admin credentials
-- Creating admin user for Turso database
-- Insert admin user ozguradmin with hashed password
INSERT INTO admin_users (username, password_hash) 
VALUES ('ozguradmin', '$2b$10$8K9wE2nY5fJ3qL7mP1rN4eXvZ6tA0sC2dF8gH1iJ4kL6mN9oP2qR3s');
