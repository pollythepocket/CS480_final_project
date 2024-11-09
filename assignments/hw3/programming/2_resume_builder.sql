DROP DATABASE IF EXISTS hw3_resume_builder;
CREATE DATABASE hw3_resume_builder;
USE hw3_resume_builder;

-- DDL section

-- Task 2.1: Create tables: User, Resume, Experience, Education, Skill, Resume_Skill
-- Please maintain the order of all tables as shown in the code below, as the autograder will evaluate each table in this exact sequence.

-- Output (please maintain the order of columns):
-- User: user_id, name, email
-- Resume: resume_id, title, user_id
-- Experience: experience_id, resume_id, company, job_title, start_date, end_date
-- Education: education_id, resume_id, institution, degree, graduation_year
-- Skill: skill_id, skill_name
-- Resume_Skill: resume_id, skill_id

-- DML section:

-- Task 2.2: Insert Data

-- Display all tables after Task 2.2
SELECT * FROM User;
SELECT * FROM Resume;
SELECT * FROM Education;
SELECT * FROM Experience;
SELECT * FROM Skill;
SELECT * FROM Resume_Skill;

-- Task 2.3: Update tables

-- Display all tables after Task 2.3
SELECT * FROM User;
SELECT * FROM Resume;
SELECT * FROM Education;
SELECT * FROM Experience;
SELECT * FROM Skill;
SELECT * FROM Resume_Skill;

-- Task 2.4: Delete operations

-- Display all tables after Task 2.4
SELECT * FROM User;
SELECT * FROM Resume;
SELECT * FROM Education;
SELECT * FROM Experience;
SELECT * FROM Skill;
SELECT * FROM Resume_Skill;
