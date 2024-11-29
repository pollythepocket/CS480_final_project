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
@route POST /register
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
        query = 'INSERT INTO Admins (username, password) VALUES (?, ?, ?)';
    } else {
        query = 'INSERT INTO Clients (username, password, has_artist_permission) VALUES (?, ?, ?)';
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
@route POST /login
@request {username, password}
@response {
            data: [{client_id, username, password, has_artist_permission}], 
            message: "Login Successful"
           }
@desc Will check if a client exists
*/
// Login user
app.post('/login', (req, res) => {
    const { username, password, isAdmin} = req.body;
    const adminResults = [];
    console.log("login>", username)
    if (isAdmin) {
        console.log("admin");
        const checkAdminQuery = 'SELECT * FROM Admins WHERE username = ?';
        db.query(checkAdminQuery, [username], (err, adminResults) => {
          if (err) return res.status(500).send('Database error');
          if (adminResults.length > 0) {
            const user = adminResults[0];
            if (bcrypt.compareSync(password, user.password)) {
              return res.send('Admin login successful!');
            } else {
              return res.status(400).send('Incorrect password');
            }
          }
          return res.status(400).send('User not found');
        });
      } else {
        console.log("not admin");
        const checkClientQuery = 'SELECT * FROM Clients WHERE username = ?';
        db.query(checkClientQuery, [username], (err, clientResults) => {
          if (err) return res.status(500).send('Database error');
          if (clientResults.length > 0) {
            const user = clientResults[0];
            if (bcrypt.compareSync(password, user.password)) {
              return res.status(200).json({
                message: "Client login successful!",
                data: user,
              });
            } else {
              return res.status(400).json({
                message: "Incorrect username or password",
              });
            }
          } else {
            return res.status(400).send('User not found');
          }
        });
      }        
});



/**
 * @route GET /songs
 *        /songs?column=song_name&sort=desc
 *        /songs?name=<string>
 * @request optional parameters {sort, column, search, name}. 
 * @sort Valid parameters for sort are {asc, desc}.
 * @column parameters for column are {song_name, artist_name, album_name}
 * @search parameters for search are {song_name, artist_name, album_name}
 * @name is the name of the <search> you want to look for
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
    const search = req.query.search
    const name = req.query.name;

    const validOption = ['asc', 'desc'];
    const order = validOption.includes(sort?.toLowerCase()) ? sort.toUpperCase() : 'ASC';

    const validColumn = ['song_name', 'artist_name', 'album_name'];
    const sortColumn = validColumn.includes(column) ? column : 'song_name';

    const validSearch = ['song_name', 'artist_name', 'album_name'];
    const sortSearch = validSearch.includes(search) ? search : 'song_name';

    const searchName = name != null ? `%${name}%` : "%"; 

    const query = `SELECT * FROM Songs WHERE ${sortColumn} IS NOT NULL AND ${sortSearch} LIKE "${searchName}" ORDER BY ${sortColumn} ${order}`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('An error occurred while fetching songs.');
        }
        results = results.length > 0 ? results : [];
        res.status(200).json({
            data: results,
            message: "Retrieved songs!"
        });
    })
});

app.post('/songs', (req, res) => {
    const { song_name, artist_name, album_name, duration } = req.body;


    const query = `INSERT INTO Songs(song_name, artist_name, album_name, duration) VALUES (?, ?, ?, ?)`;
    db.query(query, [song_name, artist_name, album_name, duration],(err, result) => {
        if (err) {
            console.error('Error adding liked songs:', err);
            return res.status(200).json({
                message: `Already Added!`
            });
        }
        res.status(200).json({
            message: `Added New Song!`
        });
    })
});

/**
 * @route GET /albums
 *        GET /albums?column=<column option>>&sort=<sort option>
 *        GET /albums?name=<name>
 * @request optional parameters {sort, column, search, name}. 
 * @sort_option Valid parameters for sort are {asc, desc}.
 * @column_option parameters for column are {album_name, artist_name, duration, number_of_songs}
 * @search_option parameters for search are {album_name, artist_name, duration, number_of_songs}
 * @name is the name of the <search> column you want
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
    const search = req.query.search;

    const validOption = ['asc', 'desc'];
    const order = validOption.includes(sort?.toLowerCase()) ? sort.toUpperCase() : 'ASC';

    const validColumn = ['album_name', 'artist_name', 'duration', 'number_of_songs'];
    const sortColumn = validColumn.includes(column) ? column : 'album_name';

    const validSearch = ['album_name', 'artist_name', 'duration', 'number_of_songs'];
    const sortSearch = validSearch.includes(search) ? search : 'album_name';

    const searchName = name != null ? `%${name}%` : "%"; 

    const query = `SELECT * FROM Albums WHERE ${sortColumn} IS NOT NULL AND ${sortSearch} LIKE "${searchName}" ORDER BY ${sortColumn} ${order}`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('Error fetching albums:', err);
            return res.status(500).json({
                query: query,
                message: 'An error occurred while fetching albums.'
            });
        }
        results = results.length > 0 ? results : [];
        res.status(200).json({
            query: query,
            data: results,
            message: `Retrieved albums with ${sort} and ${sortColumn}!`
        });
    })
});

/**
 * @route GET /artists
 *        GET /artists?sort=<sort option>
 *        GET /artists?name=<name>
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

    const query = `SELECT * FROM Artists WHERE artist_name LIKE "${searchName}" ORDER BY artist_name ${order}`;
    db.query(query,(err, results) => {
        if (err) {
            console.error('Error fetching artists:', err);
            return res.status(500).send('An error occurred while fetching artists.');
        }
        results = results.length > 0 ? results : [];

        res.status(200).json({
            data: results,
            message: `Retrieved albums with ${sort}!`
        });
    })
});


app.post('/artists', (req, res) => {
    const { artist_name} = req.body;

    const query = `INSERT INTO Artists(artist_name) VALUES (?)`;
    db.query(query, [artist_name],(err, result) => {
        if (err) {
            console.error('Error adding liked songs:', err);
            return res.status(200).json({
                message: `Already Added!`
            });
        }
        res.status(200).json({
            message: `Added New Song!`
        });
    })
});

/**
 * @route GET /liked_songs
 * @request { username }
 * @response Show the number of favorite songs
 * @desc Will return a list the list of songs that the client liked.
 * 
 * { 
 *   data: [.. list of song objects ..],
 *   message: "Got all the liked songs!"
 * }
 */
app.get('/liked_songs', (req, res) => {
    const { username } = req.query;

    query = 'SELECT * FROM Songs JOIN Liked_Songs ON Songs.song_id = Liked_Songs.song_id WHERE Liked_Songs.username = ? ORDER BY Songs.song_name ASC';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('An error occurred while fetching songs.');
        };

        results = results.length > 0 ? results : [];

        res.status(200).json({
            data: results,
            message: "Got all the liked songs!"
        });
    });
});

/**
 * @route POST /liked_songs
 * @request { username }
 * @response Will add a new liked song to the liked songs table
 * @desc Returns back json object { message }
 */
app.post('/add_liked_songs', (req, res) => {
    const {song_id, username} = req.body;

    const query = `INSERT INTO Liked_Songs(song_id, username) VALUES (?, ?)`;
    db.query(query, [song_id, username],(err, result) => {
        if (err) {
            console.error('Error adding liked songs:', err);
            return res.status(200).json({
                message: `Already Added!`
            });
        }
        res.status(200).json({
            message: `Added New Favorite Song!`
        });
    })
});

/**
 * @route DELETE /liked_songs
 * @request { song_id, username }
 * @response Will delete a liked song from the liked song table
 * @desc Returns back json object { message }
 */
  app.delete('/liked_songs', (req, res) => {
    const { song_id, username } = req.body;

    console.log(song_id,username);


    const deleteSong = 'DELETE FROM Liked_Songs WHERE song_id = ? AND username = ?';
  
    db.query(deleteSong, [song_id, username], (err) => {
        if (err) {
            console.error('Error inserting liked song:', err); 
            return res.status(200).json({
                message: `Already Deleted!`
            });
        }
        
        res.status(200).json({
            message: "Removed Song From Liked Songs!"
        });
    });
  });

  /**
   * @route GET /clients
   * @request optional parameters {sort, column, search, name}. 
   * @sort_option Valid parameters for sort are {asc, desc}.
   * @column_option parameters for column are {username, has_artist_permission}
   * @search_option parameters for search are {username, has_artist_permission}
   * @name is the name of the <search> column you want
   * @response 
   * { message,
   *   data: [
   *    ...
   *    { username, password, has_artist_permission }
   *    ...
   *    ]}
   * @desc Will return a list of clients that match the filters
   */
  app.get('/clients', (req, res) => {
    const { column, sort, searchOn, name } = req.query;

    const validOption = ['asc', 'desc'];
    const order = validOption.includes(sort?.toLowerCase()) ? sort.toUpperCase() : 'ASC';

    const validColumn = ['username', 'has_artist_permission'];
    const sortColumn = validColumn.includes(column) ? column : 'username';

    const validSearch = ['username', 'has_artist_permission'];
    const sortSearch = validSearch.includes(searchOn) ? searchOn : 'username';

    const searchName = name != null ? `%${name}%` : "%"; 
    
    const getSong = `SELECT * FROM Clients WHERE ${sortColumn} IS NOT NULL AND ${sortSearch} LIKE "${searchName}" ORDER BY ${sortColumn} ${order}`;

    db.query(getSong, (err, results) => {
        if (err) {
            console.error('Error retrieving the list of clients:', err);  // Logs detailed error
            return res.status(500).send('Error retrieving the clients');
        }
        results = results.length > 0 ? results : [];
        res.status(200).json({
            data: results,
            message: "Retrieved Clients List!"
        });
    });
  });
  


// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});


module.exports = app;