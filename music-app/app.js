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

/**
@route /register
@request {username, password, isAdmin}
@response {message: "Registration Is Successful"}
@desc Will create a new client
*/
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

/**
@route /login
@request {username, password}
@response {
            data: [{client_id, username, password, email, has_artist_permission}], 
            message: "Login Successful"
           }
@desc Will check if a client exists
*/
// Login user
app.post('/login', (req, res) => {
    const { username, password, isAdmin} = req.body;
    const adminResults = [];

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
                    return res.status(200).json({
                        message: "Client login successsful!",
                        data: user,
                    });
                    // return res.send('Client login successful!');
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



/**
 * @route /songs
 *        /songs?column=song_name&sort=desc
 *        /songs?name=<string>
 * @request optional parameters {sort, column, name}. 
 * @sort Valid parameters for sort are {asc, desc}.
 * @column parameters for column are {song_name, artist_name, album_name}
 * @name is the name of the song you want to look for
 * @response List of songs in the order specified: see below
 * [
 * ...
 * { song_id 
 *   song_name 
 *   artist_name
 *   album_name
 *   duration
 * }....
 * ]
 * @desc List of songs in the order specified
 */
app.get('/songs', (req, res) => {
    const sort = req.query.sort;
    const column = req.query.column;
    const name = req.query.name;

    const validOption = ['asc', 'desc'];
    const order = validOption.includes(sort?.toLowerCase()) ? sort.toUpperCase() : 'ASC';
    const results = [];

    const validColumn = ['song_name', 'artist_name', 'album_name'];
    const sortColumn = validColumn.includes(column) ? column : 'song_name';

    const searchName = name != null ? `%${name}%` : "%"; 

    const query = `SELECT * FROM Songs WHERE ${sortColumn} IS NOT NULL AND song_name LIKE "${searchName}" ORDER BY ${sortColumn} ${order}`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('An error occurred while fetching songs.');
        }
        
        res.status(200).json({
            data: results,
            message: "Retrieved songs!"
        });
    })
});

/**
 * @route /albums
 *        /albums?column=<column option>>&sort=<sort option>
 *        /albums?name=<name>
 * @request optional parameters {sort, column}. 
 * @sort_option Valid parameters for sort are {asc, desc}.
 * @column_option parameters for column are {album_name, artist_name, duration, number_of_songs}
 * @name is the name of the album you want
 * @response List of albums in the order specified: see below
 * [
 * ...
 * { album_name, artist_name, duration, number_of_songs, album_image_url }
 * ...
 * ]
 * @desc List of albums in the order specified
 */
app.get('/albums', (req, res) => {
    const sort = req.query.sort;
    const column = req.query.column;
    const name = req.query.name;

    const validOption = ['asc', 'desc'];
    const order = validOption.includes(sort?.toLowerCase()) ? sort.toUpperCase() : 'ASC';

    const validColumn = ['album_name', 'artist_name', 'duration', 'number_of_songs'];
    const sortColumn = validColumn.includes(column) ? column : 'album_name';

    const searchName = name != null ? `%${name}%` : "%"; 
    const results = [];
    const query = `SELECT * FROM Albums WHERE ${sortColumn} IS NOT NULL AND album_name LIKE "${searchName}" ORDER BY ${sortColumn} ${order}`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('Error fetching albums:', err);
            return res.status(500).send('An error occurred while fetching albums.');
        }
        res.status(200).json({
            // query: query,
            data: results,
            message: `Retrieved albums with ${sort} and ${sortColumn}!`
        });
    })
});

/**
 * @route /artists
 *        /artists?sort=<sort option>
 *        /artists?name=<name>
 * @request optional parameters {sort, column}. 
 * @sort_option Valid parameters for sort are {asc, desc}.
 * @name is the name of the artists you want
 * @response List of artists in the order specified: see below
 * [
 * ...
 * {artist_name}
 * ...
 * ]
 * @desc List of albums in the order specified
 */
app.get('/artists', (req, res) => {
    const sort = req.query.sort;
    const name = req.query.name;

    const validOption = ['asc', 'desc'];
    const order = validOption.includes(sort?.toLowerCase()) ? sort.toUpperCase() : 'ASC';

    const searchName = name != null ? `%${name}%` : "%"; 
    const results = [];
    const query = `SELECT * FROM Artists WHERE artist_name LIKE "${searchName}" ORDER BY artist_name ${order}`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('Error fetching artists:', err);
            return res.status(500).send('An error occurred while fetching artists.');
        }
        res.status(200).json({
            data: results,
            message: `Retrieved albums with ${sort}!`
        });
    })
});

/**
 * @route /add-to-favorites
 * @request {client_id, song_id}
 * @response Show updated number of favorite songs
 * @desc Will add a new song to the liked list of songs for that client
 */
app.post('/add-to-favorites', (req, res) => {
    const {client_id, song_id} = req.body;

    const query = `INSERT INTO Liked_Songs(client_id, song_id) VALUES (${client_id}, ${song_id})`;
    const results = [];
    db.query(query, [client_id, song_id], (err, results) => {
        if (err) {
            console.error('Error adding liked songs:', err);
            return res.status(500).send('An error occurred while adding a new liked song.');
        }
        res.status(200).json({
            message: `Added New Favorite Song!`
        });
    })
});


// SEARCH FOR FAVORITE SONGS
// expects the client id, returns a list of all liked songs
app.get('/favorite-songs', (req, res) => {
    // how do I save the id of the specific user that we have.
    const { username } = req.body;
    const results = [];
    query = 'SELECT * FROM Songs JOIN Liked_Songs ON Songs.song_id = Liked_Songs.song_id WHERE Liked_Songs.username = ?';
    db.query(query, [client_id], (err, results) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('An error occurred while fetching songs.');
        };

        res.status(200).json({
            data: results,
            message: "Got all the liked songs!"
        });
    });
});

//grabbing user's liked songs
app.post('/getLikedSongs', (req, res) => {
    const { username } = req.body;
    const getLikedSongs = 'SELECT * FROM Songs JOIN Liked_Songs ON Songs.song_id = Liked_Songs.song_id WHERE Liked_Songs.username = ?'
    db.query(getLikedSongs, [username], (err, songResults) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('An error occurred while fetching songs.');
        }
        if (songResults.length > 0) {
            return res.json(songResults);
        } else {
            return res.status(404).send('No songs found.');
        }
    });
});


app.post('/addLikedSong', (req, res) => {
    const { song_id, username } = req.body;
    const AddLikedSong = 'INSERT INTO Liked_Songs(song_id, username) VALUES (?, ?)';
  
    db.query(AddLikedSong, [song_id, username], (err) => {
      if (err) {
        console.error('Error inserting liked song:', err);  // Logs detailed error
        return res.status(500).send('Already Added');
      }
    });
  });


  app.post('/deleteLikedSong', (req, res) => {
    const { song_id, username } = req.body;
    const deleteSong = 'DELETE FROM Liked_Songs WHERE song_id= ?';
  
    db.query(deleteSong, [song_id, username], (err) => {
      if (err) {
        console.error('Error inserting liked song:', err);  // Logs detailed error
        return res.status(500).send('Already deleted');
      }
    });
  });



  app.post('/getAllSongs', (req, res) => {
    const getSongQuery = 'SELECT * FROM Songs';
    db.query(getSongQuery, [], (err, songResults) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('An error occurred while fetching songs.');
        }
        if (songResults.length > 0) {
            return res.json(songResults);
        } else {
            return res.status(404).send('No songs found.');
        }
    });
});
   

// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});


module.exports = app;