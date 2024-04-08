CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
);

INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', 'password123'),
('Jane Doe', 'jane@example.com', 'password123');