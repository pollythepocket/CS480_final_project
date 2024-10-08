DROP DATABASE IF EXISTS task5;
CREATE DATABASE task5;
USE task5;

-- Create Customer table
CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,   
    name VARCHAR(100) NOT NULL,    
    gender CHAR(1),              
    city VARCHAR(100) NOT NULL    
);

-- Create Product table
CREATE TABLE Product (
    product_id INT PRIMARY KEY, 
    product_name VARCHAR(100) NOT NULL, 
    product_price DECIMAL(10, 2) NOT NULL 
);

-- Create Sales table
CREATE TABLE Sales (
    sales_id INT PRIMARY KEY,    
    product_id INT NOT NULL,     
    customer_id INT NOT NULL, 
    sale_date DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id), 
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) 
);

-- Create Stuff table
CREATE TABLE Stuff (
    sales_id INT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    gender CHAR(1), 
    age INT NOT NULL,
    start_year INT NOT NULL, 
    FOREIGN KEY (sales_id) REFERENCES Sales(sales_id) 
);


-- Insert data into the Customer table
INSERT INTO Customer (customer_id, name, gender, city) VALUES
(1, 'John Doe', 'M', 'New York'),
(2, 'Jane Smith', 'F', 'Los Angeles'),
(3, 'Mike Brown', 'M', 'Chicago'),
(4, 'Emily Davis', 'F', 'Houston'),
(5, 'David Wilson', 'M', 'Phoenix'),
(6, 'Alice Johnson', 'F', 'San Francisco'),
(7, 'Bob Marley', 'M', 'Seattle'),
(8, 'Charlie Chaplin', 'M', 'Denver'),
(9, 'Diana Ross', 'F', 'Miami'),
(10, 'Elon Musk', 'M', 'Austin'),
(11, 'Fred Flintstone', 'M', 'Bedrock'),
(12, 'George Washington', 'M', 'New York'),
(13, 'Hannah Montana', 'F', 'Los Angeles');

-- Insert data into the Product table
INSERT INTO Product (product_id, product_name, product_price) VALUES
(1, 'Laptop', 999.99),
(2, 'Smartphone', 699.99),
(3, 'Tablet', 299.99),
(4, 'Headphones', 199.99),
(5, 'Smartwatch', 149.99),
(6, 'Desktop PC', 799.99),
(7, 'Gaming Console', 499.99),
(8, 'Bluetooth Speaker', 89.99),
(9, 'Camera', 599.99),
(10, 'E-reader', 129.99),
(11, 'VR Headset', 399.99),
(12, 'Smart Thermostat', 249.99),
(13, 'Fitness Tracker', 99.99),
(14, 'Drone', 299.99),
(15, 'Action Camera', 199.99);

-- Insert data into the Sales table
INSERT INTO Sales (sales_id, product_id, customer_id, sale_date) VALUES
(1, 1, 6, '2024-01-01'),
(2, 4, 2, '2024-01-02'),
(3, 7, 8, '2024-01-03'),
(4, 4, 4, '2024-01-04'),
(5, 5, 5, '2024-01-05'),
(6, 13, 10, '2024-01-06'),
(7, 2, 4, '2024-01-07'),
(8, 1, 6, '2024-01-08'),
(9, 4, 2, '2024-01-09'),
(10, 3, 10, '2024-01-10'),
(11, 6, 6, '2024-02-01'),
(12, 7, 9, '2024-02-02'),
(13, 15, 8, '2024-02-03'),
(14, 9, 9, '2024-02-04'),
(15, 1, 10, '2024-02-05'),
(16, 11, 8, '2024-02-06'),
(17, 7, 7, '2024-02-07'),
(18, 13, 5, '2024-02-08'),
(21, 3, 6, '2024-03-01'),
(22, 2, 7, '2024-03-02'),
(23, 3, 5, '2024-03-03'),
(24, 13, 9, '2024-03-04'),
(25, 5, 10, '2024-03-05'),
(26, 15, 5, '2024-03-06'),
(27, 7, 9, '2024-03-07'),
(28, 8, 10, '2024-03-08');

-- Insert data into the Stuff table
INSERT INTO Stuff (sales_id, name, gender, age, start_year) VALUES
(1, 'Michael Jordan', 'M', 32, 2020),
(2, 'Sarah Connor', 'F', 29, 2021),
(3, 'James Bond', 'M', 40, 2019),
(4, 'Natasha Romanoff', 'F', 35, 2018),
(5, 'Clark Kent', 'M', 30, 2022),
(6, 'Bruce Wayne', 'M', 40, 2020),
(7, 'Diana Prince', 'F', 28, 2021),
(8, 'Peter Parker', 'M', 24, 2023),
(9, 'Tony Stark', 'M', 45, 2019),
(10, 'Steve Rogers', 'M', 35, 2020);


-- Task 5.1 Find the customer who has spent the most money in total
-- Output column titles: customer_id, name, total_spent
-- Note: column name is the name of the customer.


-- Task 5.2 Find all customers who have purchased more than 3 distinct products
-- Please ensure to list the records in increasing order (from small to large) (ordered by product_count: the number of purchased products)
-- Output column titles: customer_id, name, product_count.
-- Note: column name is the name of the customer.


-- Task 5.3 Find sales made between '2024-01-01' and '2024-01-10'
-- Output column titles: sales_id, customer_name, product_name, sale_date


-- Task 5.4 Find the total revenue generated by each city, along with the number of transactions in each city.
-- Note: Cities with zero revenue should be excluded from the results.
-- Please ensure to list the records in descending order based on total_revenue based on total_revenue (from large to small).
-- Output column titles: city, total_customers, total_revenue
-- Note, the column name here is total_customers, which should be total_transactions. But to avoid the affection of autograder in Gradescope, we still use total_customers here.


-- Task 5.5 Find customers who purchased a product that no other customers have bought (exclusive purchases).
-- Output column titles: customer_id, name, product_name
-- Note: column name is the name of the customer.
