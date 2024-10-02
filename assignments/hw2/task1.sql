DROP DATABASE IF EXISTS task1;
CREATE DATABASE task1;
USE task1;

-- Creating the Venue table
CREATE TABLE Venue (
    venue_id VARCHAR(20) PRIMARY KEY,
    venue_name VARCHAR(50),
    venue_type VARCHAR(20)
);

-- Creating the Publications table
CREATE TABLE Publications (
    pub_id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100),
    first_author_name VARCHAR(50),
    total_authors INT,
    venue_id VARCHAR(20),
    year INT,
    FOREIGN KEY (venue_id) REFERENCES Venue(venue_id)
);

-- Creating the Keywords table
CREATE TABLE Keywords (
    keyword VARCHAR(50) PRIMARY KEY
);

-- Creating the Publication_Keywords table (Mapping table)
CREATE TABLE Publication_Keywords (
    pub_id VARCHAR(20),
    keyword VARCHAR(50),
    PRIMARY KEY (pub_id, keyword),
    FOREIGN KEY (pub_id) REFERENCES Publications(pub_id),
    FOREIGN KEY (keyword) REFERENCES Keywords(keyword)
);

-- Inserting data into Venue
INSERT INTO Venue (venue_id, venue_name, venue_type) VALUES
('SIGMOD', 'ACM SIGMOD', 'Conference'),
('VLDB', 'Very Large Data Bases', 'Conference'),
('SSDBM', 'Scientific and Statistical Database Management', 'Workshop'),
('BigData', 'IEEE Big Data', 'Conference');

-- Inserting data into Publications
INSERT INTO Publications (pub_id, title, first_author_name, total_authors, venue_id, year) VALUES
('P001', 'MG-Join', 'Paul', 4, 'SIGMOD', 2021),
('P002', 'Efficient join', 'Rui', 3, 'VLDB', 2020),
('P003', 'Fast Equi-Join', 'Rui', 2, 'SSDBM', 2017),
('P004', 'Join algorithms', 'Rui', 3, 'BigData', 2015),
('P005', 'Triton Join', 'Lutz', 5, 'SIGMOD', 2022),
('P006', 'Triangle Counting', 'Hu', 3, 'SIGMOD', 2021),
('P007', 'GPU DB Systems', 'Cao', 5, 'VLDB', 2023),
('P008', 'Temporal Join', 'Hu', 5, 'SIGMOD', 2022),
('P009', 'Recursive Datalog', 'Wu', 3, 'SIGMOD', 2022),
('P010', 'Recursive Queries', 'Wang', 5, 'SIGMOD', 2022);

-- Inserting data into Keywords
INSERT INTO Keywords (keyword) VALUES
('Multi-GPU'),
('GPU'),
('Graph'),
('DB'),
('CPU'),
('Multi-core'),
('Parallelism'),
('Optimization'),
('Distributed Systems'),
('Data Processing');

-- Mapping keywords to publications
INSERT INTO Publication_Keywords (pub_id, keyword) VALUES
('P001', 'Multi-GPU'), 
('P001', 'DB'), 
('P002', 'Multi-GPU'), 
('P003', 'GPU'), 
('P003', 'DB'), 
('P004', 'GPU'), 
('P004', 'CPU'), 
('P005', 'GPU'), 
('P006', 'Graph'), 
('P007', 'Graph'), 
('P007', 'DB'), 
('P008', 'CPU'), 
('P008', 'DB'), 
('P009', 'Multi-core'), 
('P009', 'DB'), 
('P010', 'DB'), 
('P010', 'Graph'); 

-- Task 1.1 Find the venue that has the highest number of publications associated with the keyword 'DB'.
-- Ensure that the venue name and the count of such publications are returned.
-- Output column titles: venue_name, publication_count


-- Task 1.2 Find the total authors for each venue which has a type 'Conference' in descending order of total authors
-- Ensure that the venue name and the total authors of such venues are returned.
-- Output column titles: venue_name, total_authors


-- Task 1.3 Find the third most used keyword.
-- Output column titles: keyword
