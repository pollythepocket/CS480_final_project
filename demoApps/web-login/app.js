const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
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
    password: '<password>',
    database: 'demo_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) return res.status(400).send('User already exists');
        res.send('Registration successful!');
    });
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];

        // Check if password matches
        if (bcrypt.compareSync(password, user.password)) {
            res.send('Login successful!');
        } else {
            res.status(400).send('Incorrect password');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
