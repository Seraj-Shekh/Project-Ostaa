CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
);
ALTER TABLE users ADD COLUMN token VARCHAR(255);


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
