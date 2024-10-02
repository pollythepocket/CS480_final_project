DROP DATABASE IF EXISTS task3;
CREATE DATABASE task3;
USE task3;

-- Creating the DatabaseType table
CREATE TABLE DatabaseType (
    type_id INT PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT NULL
);

-- Creating the DatabaseSystem table
CREATE TABLE DatabaseSystem (
    system_id INT PRIMARY KEY,
    system_name VARCHAR(100) UNIQUE NOT NULL,
    type_id INT NOT NULL,
    release_date DATE NOT NULL,
    latest_version VARCHAR(20) NULL,
    FOREIGN KEY (type_id) REFERENCES DatabaseType(type_id)
);

-- Creating the Evaluation table
CREATE TABLE Evaluation (
    evaluation_id INT PRIMARY KEY,
    system_id INT NOT NULL,
    evaluation_date DATE NOT NULL,
    rating INT CHECK(rating >= 1 AND rating <= 5) NOT NULL,
    comments TEXT NULL,
    FOREIGN KEY (system_id) REFERENCES DatabaseSystem(system_id)
);


INSERT INTO DatabaseType (type_id, type_name, description) VALUES
(1, 'Relational', 'Stores data in tables with predefined relationships.'),
(2, 'NoSQL', 'Uses a variety of data models, including document, key-value, and graph.'),
(3, 'In-memory', 'Stores data in RAM for faster data access and processing.'),
(4, 'Distributed', 'Data is stored across multiple locations for fault tolerance and scalability.'),
(5, 'Graph', 'Data is represented as nodes and relationships for complex querying.'),
(6, 'Columnar', 'Optimized for reading and writing large volumes of data in columns.'),
(7, 'Spatial', 'Designed to handle spatial data and support geographical queries.'),
(8, 'Object-oriented', 'Supports objects as data types, integrating object-oriented programming with database systems.');

INSERT INTO DatabaseSystem (system_id, system_name, type_id, release_date, latest_version) VALUES
(1, 'MySQL', 1, '1995-05-23', '8.0.30'),
(2, 'PostgreSQL', 1, '1996-07-08', '14.0'),
(3, 'MongoDB', 2, '2009-02-26', '5.0.3'),
(4, 'Cassandra', 2, '2008-07-24', '4.0.0'),
(5, 'CockroachDB', 4, '2014-05-20', '21.1.0'),
(6, 'Microsoft SQL Server', 1, '1989-04-24', '2019'),
(7, 'Oracle Database', 1, '1979-06-05', '21c'),
(8, 'Redis', 3, '2009-05-10', '6.2.6'),
(9, 'Firebase Realtime Database', 2, '2011-09-02', '9.1.0'),
(10, 'Neo4j', 5, '2007-02-01', '4.3.5'),
(11, 'DynamoDB', 2, '2012-01-01', 'latest'),
(12, 'Memcached', 3, '2003-10-01', 'latest'),
(13, 'ClickHouse', 6, '2016-01-01', '21.3.9.15'),
(14, 'PostGIS', 7, '2001-01-01', 'latest'),
(15, 'ObjectDB', 8, '2003-04-01', 'latest');

INSERT INTO Evaluation (evaluation_id, system_id, evaluation_date, rating, comments) VALUES
(1, 1, '2023-01-15', 4, 'Great performance for OLTP workloads.'),
(2, 2, '2023-02-20', 5, 'Highly extensible and feature-rich.'),
(3, 3, '2023-03-10', 4, 'Excellent for unstructured data storage.'),
(4, 4, '2023-04-12', 3, 'Good for handling large datasets, but complex to manage.'),
(5, 5, '2023-05-22', 4, 'Scalable and reliable for cloud applications.'),
(6, 6, '2023-06-15', 5, 'Great for enterprise-level applications.'),
(7, 7, '2023-07-20', 4, 'Robust, but can be costly.'),
(8, 8, '2023-08-10', 4, 'Fast, but requires more memory.'),
(9, 9, '2023-09-05', 4, 'Easy to integrate with mobile applications.'),
(10, 10, '2023-09-25', 5, 'Best for graph-based data relationships.'),
(11, 11, '2023-09-26', 5, 'Highly scalable and efficient for key-value storage.'),
(12, 12, '2023-09-27', 3, 'Good caching solution, but limited persistence.'),
(13, 13, '2023-09-28', 4, 'Excellent for analytical queries and high-speed processing.'),
(14, 14, '2023-09-29', 5, 'Great for GIS applications and spatial queries.'),
(15, 15, '2023-09-30', 4, 'Seamless integration with Java applications.');


-- Task 3.1 Find the name, rating, and comments for the oldest database system of type "NoSQL"
-- Output column titles: database_name, database_rating, database_comment


-- Task 3.2 Find the database type and minimum rating for each type with an minimum rating greater than 4, ordered by minimum rating in descending order
-- Output column titles: database_type, minimum_rating


-- Task 3.3 Find the Relational database names
-- Output column titles: database_name