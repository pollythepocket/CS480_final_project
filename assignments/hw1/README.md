# Assignment 1
This repository contains both the theory and programming components for the assignment.

## Deadline: 27th September, midnight (CST).

### Theory Assigment
- Write your name, UIC email in ID, and the answers in [theory/TheoryAssignment_1.docx](theory/TheoryAssignment_1.docx)
- Create a PDF file from the completed theory assignment.
- The theory component includes 7 bonus points (total: 107/100).

### Programming Assignment
- [programming](programming) folder contains all the templates and data needed.
- Complete the `TODO` tasks in [programming/relationalAlgebra.cpp](programming/relationalAlgebra.cpp), look for:
```shell
// TODO: Task 1 implement this function
// TODO: Task 2 implement this function
// TODO: Task 3 implement this function
// TODO: Task 4 implement this function
```
You have to implement the four Relational algebra operators.
- Each function is worth 27 points, totalling 108 points. There is no explicit bonus points here, you get all four write, you get 8 bonus points.
- To compile and run the program [programming/relationalAlgebra.cpp](programming/relationalAlgebra.cpp) file:
```shell
g++ relationalAlgebra.cpp -o solution
./solution
```
- There are 4 test cases. For each test case, you will see `Case <CASE_NUMBER>, test passed` if it passes the testcase, `Error in your implementation!!!!` otherwise.   
- (Optional) You can generate your own test case using the [programming/createData.cpp](programming/createData.cpp) file.
To create an input file named `small.bin` with 5 rows, 2 columns: 
```shell
g++ createData.cpp -o gen
# Filename ROW_COUNT COLUMN_COUNT
./gen "data/small.bin" 5 2
```
- You can watch the tutorial video for the programming assignment: [https://www.youtube.com/watch?v=73AN7VV9Xcg](https://www.youtube.com/watch?v=73AN7VV9Xcg)

## Gradescope submission instructions
- Submit the completed theory assignment PDF file and completed [programming/relationalAlgebra.cpp](programming/relationalAlgebra.cpp) program file on Gradescope.
- If you have Gradescope access issue, send a message with your First name, Last name, and UIC email address. We will add you manually.


For any questions, feel free to reach out.