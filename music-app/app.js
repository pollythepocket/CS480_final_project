require('dotenv').config({ path: ".env.local" })
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// //imports environment variables from .env or .env.local file
// dotenv.config({ path: ".env.local" });


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'music_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Register a new user
app.post('/register', (req, res) => {
    const { username, password, isAdmin } = req.body;
    console.log("Registering user:", username, "Is Admin:", isAdmin);

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    let query;
    if (isAdmin) {
        query = 'INSERT INTO Admins (username, password, email) VALUES (?, ?, ?)';
    } else {
        query = 'INSERT INTO Clients (username, password, email, has_artist_permission) VALUES (?, ?, ?, ?)';
    }

    const values = isAdmin
        ? [username, hashedPassword, null]
        : [username, hashedPassword, null, 0];

    db.query(query, values, (err, result) => {
        if (err) return res.status(400).send(err.message);
        res.send(`${isAdmin ? 'Admin' : 'Client'} registration successful!`);
    });
});

// Login user
app.post('/login', (req, res) => {
    const { username, password, isAdmin} = req.body;

    if(isAdmin){
        const checkAdminQuery = 'SELECT * FROM Admins WHERE username = ?';

        db.query(checkAdminQuery, [username], (err, adminResults) => {
            if (err) throw err;

            if (adminResults.length > 0) {
                const user = adminResults[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return res.send('Admin login successful!');
                } else {
                    return res.status(400).send('Incorrect password');
                }
            }

            // If not found in either table
            return res.status(400).send('User not found');
        });
    }
    else if(!isAdmin){
        const checkClientQuery = 'SELECT * FROM Clients WHERE username = ?';
        db.query(checkClientQuery, [username], (err, clientResults) => {
            if (err) throw err;

            if (clientResults.length > 0) {
                const user = clientResults[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return res.send('Client login successful!');
                } else {
                    return res.status(400).send('Incorrect password');
                }
            }
        });
    }
    else{
        return res.status(400).send('User not found');  
    }
});


// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});
