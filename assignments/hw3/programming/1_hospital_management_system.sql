DROP DATABASE IF EXISTS hw3_hms;
CREATE DATABASE hw3_hms;
USE hw3_hms;

-- DDL section
-- Please maintain the order of all tables as shown in the code below, as the autograder will evaluate each table in this exact sequence. 

-- Task 1.1: Create tables: Department, Ward, Patient, Doctor, Diagnosis.

-- Output (please maintain the order of columns):
-- Department table: dept_id, dept_name, dept_address, dept_phone
-- Ward table: ward_id, bed_id, dept_id
-- Patient table: record_id, name, gender, ward_id
-- Doctor table: work_id, name, title, age, dept_id 
-- Diagnosis table: work_id, record_id

-- DML section:

-- Task 1.2: Insert Data

-- Display all tables after Task 1.2
SELECT * FROM Department;
SELECT * FROM Ward;
SELECT * FROM Patient;
SELECT * FROM Doctor;
SELECT * FROM Diagnosis;


-- Task 1.3: Update tables

-- Display all tables after Task 1.3
SELECT * FROM Department;
SELECT * FROM Ward;
SELECT * FROM Patient;
SELECT * FROM Doctor;
SELECT * FROM Diagnosis;


-- Task 1.4: Delete operations

-- Display all tables after Task 1.4
SELECT * FROM Department;
SELECT * FROM Ward;
SELECT * FROM Patient;
SELECT * FROM Doctor;
SELECT * FROM Diagnosis;
