# Web-based demo apps with mysql


### Setup Overview:
**Client**: A simple HTML page.  
**Server**: Node.js using Express to handle HTTP requests and communicate with a MySQL database.  
**MySQL Database**: A local MySQL instance to store data.

------------------

#### 1. Set up MySQL Database:

```
$ mysql -u root -p
$ CREATE DATABASE <db-name>;
$ USE <db-name>;
$ CREATE TABLE <table-name> (...)
$ INSERT INTO users (...) VALUES (...)
```
For example:
```
CREATE DATABASE demo_app;

USE demo_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

#### 2. Set Up the Server (Node.js + Express)
```
$ git clone https://github.com/harp-lab/cs480.git
$ cd demoApps
$ cd web-login or web-sqlQuery
$ npm init -y
$ npm install express mysql body-parser
```
Modify the MySQL connection (including host, user, password, database) in app.js.  

#### Run the Application

-  Start the MySQL server and ensure that it is running.
-  Start your app.js server by running:
```
$ node app.js
```
Your application should now be running at http://localhost:3000





