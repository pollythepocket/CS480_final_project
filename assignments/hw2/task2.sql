DROP DATABASE IF EXISTS task2;
CREATE DATABASE task2;
USE task2;

-- Creating the State table
CREATE TABLE State (
    state_id INT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    abbreviation VARCHAR(2) NOT NULL,
    population INT,
    founded_date DATE,
    capital VARCHAR(50) NOT NULL
);

-- Creating the City table
CREATE TABLE City (
    city_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state_id INT NOT NULL,
    population INT NOT NULL,
    established_date DATE,
    FOREIGN KEY (state_id) REFERENCES State(state_id)
);

-- Creating the Award table
CREATE TABLE Award (
    award_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Creating the State_Award table (mapping State to Award)
CREATE TABLE State_Award (
    award_id INT NOT NULL,
    state_id INT NOT NULL,
    award_date DATE NOT NULL,
    PRIMARY KEY (award_id, state_id),
    FOREIGN KEY (award_id) REFERENCES Award(award_id),
    FOREIGN KEY (state_id) REFERENCES State(state_id)
);

-- Inserting records into the State table
INSERT INTO State (state_id, name, abbreviation, population, founded_date, capital)
VALUES 
(1, 'California', 'CA', 39538223, '1850-09-09', 'Sacramento'),
(2, 'Texas', 'TX', 29145505, '1845-12-29', 'Austin'),
(3, 'New York', 'NY', 20201249, '1788-07-26', 'Albany'),
(4, 'Florida', 'FL', 21538187, '1845-03-03', 'Tallahassee'),
(5, 'Illinois', 'IL', 12812508, '1818-12-03', 'Springfield');

-- Inserting records into the City table
INSERT INTO City (city_id, name, state_id, population, established_date)
VALUES 
(1, 'Los Angeles', 1, 3979576, '1781-09-04'),
(2, 'Houston', 2, 2328000, '1837-06-05'),
(3, 'New York City', 3, 8419600, '1624-01-01'),
(4, 'Miami', 4, 467963, '1896-07-28'),
(5, 'Chicago', 5, 2693976, '1833-03-04'),
(6, 'San Francisco', 1, 883305, '1776-06-29'),
(7, 'Dallas', 2, 1356781, '1841-11-02'),
(8, 'Buffalo', 3, 255284, '1801-10-26'),
(9, 'Tampa', 4, 399700, '1823-01-18'),
(10, 'Naperville', 5, 149540, '1831-07-01');

-- Inserting records into the Award table
INSERT INTO Award (award_id, name)
VALUES 
(1, 'Best Economy'),
(2, 'Best Healthcare'),
(3, 'Best Education'),
(4, 'Top Tourism'),
(5, 'Most Populous'),
(6, 'Clean Energy Leader'),
(7, 'Best Agriculture'),
(8, 'Technology Innovation'),
(9, 'Top Tech Hub'),
(10, 'Safest State'),
(11, 'Best Infrastructure'),
(12, 'Cultural Heritage Award'),
(13, 'Best Business Environment');

-- Inserting records into the State_Award table (mapping awards to states)
INSERT INTO State_Award (award_id, state_id, award_date)
VALUES 
(1, 1, '2023-03-15'),
(2, 3, '2023-06-10'),
(3, 5, '2022-12-20'),
(4, 4, '2023-01-05'),
(5, 1, '2022-05-25'),
(6, 1, '2022-07-01'),
(7, 2, '2023-02-10'),
(8, 3, '2023-04-22'),
(9, 2, '2023-08-14'),
(10, 5, '2023-09-05'),
(11, 4, '2023-02-12'),
(12, 3, '2023-09-20'),
(13, 2, '2023-10-01');


-- Task 2.1 Find the total population of the cities of State Illinois
-- Output column titles: total_population


-- Task 2.2 Find the state name and total awards which has the newest formed city
-- Output column titles: state_name, total_awards


-- Task 2.3 Find the city names and city population of the state with most awards
-- Output column titles: city_name, city_population
