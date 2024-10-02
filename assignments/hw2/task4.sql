DROP DATABASE IF EXISTS task4;
CREATE DATABASE task4;
USE task4;

-- Creating the Employee table
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    chair_id INT -- References the employee_id of the employee's chair
);


-- Creating the EmployeeSalary table
CREATE TABLE EmployeeSalary (
    employee_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL CHECK (salary > 0),  -- salary must be positive
    year INT NOT NULL CHECK (year >= 1900),  -- Ensure year is valid
    PRIMARY KEY (employee_id, year),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);


-- Creating the Course table
CREATE TABLE Course (
    course_id INT PRIMARY KEY,
    employee_id INT NOT NULL,
    level VARCHAR(3) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Theory', 'System', 'Application'))  -- Ensures course type is valid
);


-- Creating the Enrollment table
CREATE TABLE Enrollment (
    course_id INT NOT NULL,
    enrollment_No INT NOT NULL,
    enrollment_date DATE NOT NULL,
    enrollment_fee DECIMAL(10, 2) NOT NULL CHECK (enrollment_fee >= 0),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

-- Inserting data into the Employee table
INSERT INTO Employee (employee_id, name, department, location, chair_id) VALUES
(1, 'John Doe', 'Engineering', 'New York', 4),
(2, 'Jane Smith', 'Marketing', 'San Francisco', 9),
(3, 'Michael Johnson', 'Finance', 'Chicago', 4),
(4, 'Emily Davis', 'CS', 'Los Angeles', NULL),
(5, 'James Brown', 'CS', 'Seattle', 14),
(6, 'Robert Wilson','Engineering', 'Boston', 1),
(7, 'Olivia Martinez', 'Design', 'San Diego', 9),
(8, 'David Lee', 'Product', 'New York', 4),
(9, 'Sophia Lopez', 'Marketing', 'Miami', 4),
(10, 'Daniel King', 'Finance', 'Chicago', 3),
(11, 'Isabella Scott', 'Finance', 'Los Angeles', 10),
(12, 'Lucas Turner', 'Engineering', 'Austin', 1),
(13, 'Mia Young', 'Product', 'Seattle', 8),
(14, 'Alexander Harris', 'CS', 'Boston', 4),
(15, 'Amelia Hall', 'CS', 'San Francisco', 14);


-- Inserting data into EmployeeSalary table
INSERT INTO EmployeeSalary (employee_id, salary, year) VALUES
(1, 85000.00, 2017),
(1, 90000.00, 2019),
(2, 72000.00, 2013),
(3, 95000.00, 2020),
(3, 98000.00, 2018),
(4, 70000.00, 2021),
(5, 77000.00, 2019),
(5, 80000.00, 2018),
(6, 108000.00, 2018),
(7, 67000.00, 2014),
(7, 70000.00, 2016),
(8, 86000.00, 2019),
(9, 75000.00, 2017),
(9, 78000.00, 2021),
(10, 88000.00, 2020),
(10, 90000.00, 2021),
(11, 68000.00, 2020),
(11, 71000.00, 2019),
(12, 92000.00, 2017),
(12, 96000.00, 2021),
(13, 62000.00, 2021),
(14, 115000.00, 2020),
(14, 118000.00, 2017),
(15, 78000.00, 2014),
(15, 81000.00, 2021);


-- Inserting data into Course table
INSERT INTO Course (course_id, employee_id, level, type) VALUES
(101, 1, '3xx', 'Application'),
(102, 15, '4xx', 'System'),
(103, 5, '5xx', 'Application'),
(104, 8, '4xx', 'Theory'),
(105, 6, '3xx', 'Application'),
(106, 4, '3xx', 'Application'),
(107, 12, '4xx', 'System'),
(108, 15, '5xx', 'System'),
(109, 3, '3xx', 'System'),
(110, 6, '5xx', 'Application'),
(111, 13, '4xx', 'Theory'),
(112, 7, '5xx', 'System');


-- Inserting data into Enrollment table
INSERT INTO Enrollment (course_id, enrollment_No, enrollment_date, enrollment_fee) VALUES
(101, 56, '2023-09-01', 500.00),
(102, 55, '2023-09-05', 750.00),
(103, 64, '2023-09-10', 900.00),
(104, 72, '2023-09-12', 650.00),
(105, 66, '2023-09-15', 700.00),
(106, 81, '2023-09-18', 600.00),
(107, 24, '2023-09-20', 850.00),
(108, 53, '2023-09-22', 950.00),
(109, 25, '2023-09-25', 700.00),
(110, 64, '2023-09-27', 1000.00),
(111, 44, '2023-09-29', 900.00),
(112, 37, '2023-10-01', 850.00);


-- Task 4.1 Retrieve the maximum, minimum, and average salary for each department for the year 2021.
-- Output column titles: department, MaxSalary, MinSalary, AvgSalary


-- Task 4.2 Calculate the average enrollment fee for each course type (Theory, System, Application).
-- Output column titles: type, AvgFee


-- Task 4.3 Find all courses taught by instructors who have a salary greater than 80,000 in 2020.
-- Output column titles: course_id, type, name


-- Task 4.4 Finding Employees with Salaries Above the Average salary
-- Output column titles: name, salary


-- Task 4.5 Find the course that has collected the highest total enrollment fee.
-- Output column titles: course_id, total_fees


-- Task 4.6 Using a recursive common table expression (CTE) to find the hierarchical structure of employees and their chairs (referred to as chair_id).
-- Defining a recursive CTE named EmployeeHierarchy, allowing SQL to perform iterative operations.
-- Hints: 
   -- (a) The base case of the recursion, where we select all employees who do not report to anyone (chair_id is NULL)
   -- (b) Assigning a constant value of 1 to the column level for these top-level employees, indicating that they are at the top level of the hierarchy.
   -- (c) Performing a recursive SELECT to find employees who report to those already in the EmployeeHierarchy CTE.
   -- (d) For each recursive step, the level is incremented by 1, so that employees at a lower level are one step below their chairs.
   -- (e) The final query selects all records from the recursive CTE EmployeeHierarchy, which now contains the complete hierarchy, with each employee's level in the organization.
-- Output column titles: employee_id, name, chair_id, level
