CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
);
ALTER TABLE users ADD COLUMN token VARCHAR(255);

-- Altering the users table to add the reset_token column for forgot password functionality
ALTER TABLE users ADD COLUMN reset_token VARCHAR(255);

INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', 'password123'),
('Jane Doe', 'jane@example.com', 'password123');

CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--product table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);
INSERT INTO products (name, price, image_url) VALUES
('Product 1', 100.00, 'img/blue-bag.jpg'),
('Product 2', 150.00, 'img/blue-bag.jpg'),
('Product 3', 200.00, 'img/blue-bag.jpg');
('Product 1', 100.00, 'img/blue-bag.jpg'),
('Product 2', 150.00, 'img/blue-bag.jpg'),
('Product 3', 200.00, 'img/blue-bag.jpg');
('Product 1', 100.00, 'img/blue-bag.jpg'),
('Product 2', 150.00, 'img/blue-bag.jpg'),
('Product 3', 200.00, 'img/blue-bag.jpg');
-- Add more sample products as needed
