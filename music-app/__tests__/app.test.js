const request = require('supertest');
const app = require('../app'); // Path to your Express app
const mysql = require('mysql2');
const json = require('json');

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'music_app'
});

let userId = 1;

describe('User API Tests', () => {
  // beforeAll(async () => {
  //   const response = await request(app)
  //     .post()
  // });

  afterAll(async () => {
    // Clean up and close the database connection
    // await db.query('DROP TABLE IF EXISTS Clients;');
    await db.close(); // Close the database connection
  });

  let userId = 'emily';

  // test('POST /register - Create a new user', async () => {
  //   const newUser = {
  //     username: 'emily',
  //     password: 'emily',
  //     isAdmin: false,
  //   };

  //   const response = await request(app)
  //     .post('/register')
  //     .send(newUser)
  //     .set('Accept', 'application/json');

  //   console.log(response.body);

  //   expect(response.status).toBe(200);

  //   userId = response.body.id; // Save the user ID for the next test
  // });

  test('GET /login - Retrieve the created user', async () => {
    const user = {
      username: 'emily',
      password: 'emily',
      isAdmin: false
    }
    const response = await request(app)
      .post(`/login`)
      .send(user);

    let info = response.body.data;
    console.log(info);

    expect(response.status).toBe(200);
    expect(info.username).toBe('emily');
  });

  test('GET /songs - Get all the songs we have in the database', async () => {
    const response = await request(app)
      .get(`/songs`);

    let info = response.body.data;
    const songList = info.map(item => item);
    // console.log(songList);

    expect(response.status).toBe(200);
    expect(songList.length).toBe(477);
  });

  test('GET /songs - Test ASC', async () => {
    const response = await request(app)
      .get(`/songs?column=song_name&sort=asc`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      song_id: item.song_id, 
      song_name: item.song_name, 
      artist_name: item.artist_name,
      album_name: item.album_name,
      duration: item.duration
    }));
    // console.log(songList[0]);

    expect(response.status).toBe(200);
    expect(songList[0].song_id).toBe(425);
  });

  test('GET /songs - Test DESC', async () => {
    const response = await request(app)
      .get(`/songs?column=song_name&sort=desc`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      song_id: item.song_id, 
      song_name: item.song_name, 
      artist_name: item.artist_name,
      album_name: item.album_name,
      duration: item.duration
    }));
    // console.log(songList[0]);

    expect(response.status).toBe(200);
    expect(songList[0].song_id).toBe(149);
  });

  test('GET /songs - Test Sort By Artist Name', async () => {
    const response = await request(app)
      .get(`/songs?column=artist_name&sort=asc`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      song_id: item.song_id, 
      song_name: item.song_name, 
      artist_name: item.artist_name,
      album_name: item.album_name,
      duration: item.duration
    }));
    // console.log(songList[0]);

    expect(response.status).toBe(200);
    expect(songList[0].song_id).toBe(455);
  });

  test('GET /songs - Test Sort By Album Name', async () => {
    const response = await request(app)
      .get(`/songs?column=album_name&sort=asc`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      song_id: item.song_id, 
      song_name: item.song_name, 
      artist_name: item.artist_name,
      album_name: item.album_name,
      duration: item.duration
    }));
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(songList[0].album_name).toBe("A Night At The Opera");
  });

  test('GET /songs - Test Search for Song By Song_Name', async () => {
    const response = await request(app)
      .get(`/songs?column=artist_name&sort=asc&name=Like Hi`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      song_id: item.song_id, 
      song_name: item.song_name, 
      artist_name: item.artist_name,
      album_name: item.album_name,
      duration: item.duration
    }));
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(songList[0].song_id).toBe(12);
  });

  test('GET /songs - Test Search for Song By Artist_Name', async () => {
    const response = await request(app)
      .get(`/songs?name=Tyler&search=artist_name`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      song_id: item.song_id, 
      song_name: item.song_name, 
      artist_name: item.artist_name,
      album_name: item.album_name,
      duration: item.duration

    }));
    // console.log(songList[0]);
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(songList[0].artist_name).toBe("Tyler, The Creator");
  });

  test('GET /albums - Get All Albums', async () => {
    const response = await request(app)
      .get(`/albums`); 

    let info = response.body.data;
    const songList = info.map(item => ({
      album_name: item.album_name, 
      artist_name: item.artist_name, 
      duration: item.duration,
      number_of_songs: item.number_of_songs,
      album_image_url: item.album_image_url

    }));

    expect(response.status).toBe(200);
    expect(songList.length).toBe(41);
  });

  test('GET /albums - Try the number_of_songs Column', async () => {
    const response = await request(app)
      .get(`/albums?column=number_of_songs&sort=asc`); 

    let info = response.body.data;
    const albumList = info.map(item => ({
      album_name: item.album_name, 
      artist_name: item.artist_name, 
      duration: item.duration,
      number_of_songs: item.number_of_songs,
      album_image_url: item.album_image_url

    }));

    // console.log(albumList[0]);
    // console.log(response.body.message);

    expect(response.status).toBe(200);
    expect(albumList[0].album_name).toBe("Animals");
  });

  test('GET /albums - Try with a album name and DESC', async () => {
    const response = await request(app)
      .get(`/albums?name=Chroma`); 

    let info = response.body.data;
    const albumList = info.map(item => ({
      album_name: item.album_name, 
      artist_name: item.artist_name, 
      duration: item.duration,
      number_of_songs: item.number_of_songs,
      album_image_url: item.album_image_url

    }));

    // console.log(albumList[0]);
    // console.log(response.body.message);
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(albumList[0].album_name).toBe("CHROMAKOPIA");
  });

  test('GET /albums - Search by artist_name', async () => {
    const response = await request(app)
      .get(`/albums?name=Tyler&search=artist_name`); 

    let info = response.body.data;
    const albumList = info.map(item => ({
      album_name: item.album_name, 
      artist_name: item.artist_name, 
      duration: item.duration,
      number_of_songs: item.number_of_songs,
      album_image_url: item.album_image_url

    }));

    // console.log(albumList[0]);
    // console.log(response.body);
    // console.log(response.body.message);
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(albumList[0].album_name).toBe("CHROMAKOPIA");
  });

  test('GET /artists - List Artists In the Order of Sort', async () => {
    const response = await request(app)
      .get(`/artists?sort=desc`); 

    let info = response.body.data;
    const albumList = info.map(item => ({
      artist_name: item.artist_name, 
    }));

    // console.log(albumList[0]);
    // console.log(response.body.message);
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(albumList[0].artist_name).toBe("Xakei");
  });

  test('GET /artists - List Artists With Search', async () => {
    const response = await request(app)
      .get(`/artists?name=Tyl&sort=desc`); 

    let info = response.body.data;
    const albumList = info.map(item => ({
      artist_name: item.artist_name, 
    }));

    // console.log(albumList[0]);
    // console.log(response.body.message);
    // console.log(response.body.query);

    expect(response.status).toBe(200);
    expect(albumList[0].artist_name).toBe("Tyler, The Creator");
  });

  test('GET /liked_songs - show all the liked songs', async () => {
    const likeSong = {
      username: 'emily',
    };

    const response = await request(app)
      .get(`/liked_songs`)
      .send(likeSong); 

    let info = response.body;
    // console.log(info);

    expect(response.status).toBe(200);
    expect(info.message).toBe("Got all the liked songs!");
  });

  test('POST /liked_songs - add a new liked song', async () => {
    const likeSong = {
      username: "emily",
      song_id: 3 // might need to change for the test to pass
    };

    const response = await request(app)
      .post(`/liked_songs`)
      .send(likeSong); 

    let info = response.body;
    // console.log(info);

    expect(response.status).toBe(200);
    expect(info.message).toBe("Added New Favorite Song!");
  });

  test('DELETE /liked_songs - delete a liked song', async () => {
    const likeSong = {
      username: "emily",
      song_id: 3 // might need to change for the test to pass
    };

    const response = await request(app)
      .delete(`/liked_songs`)
      .send(likeSong); 

    let info = response.body;
    console.log(info);

    expect(response.status).toBe(200);
    expect(info.message).toBe("Removed Song From Liked Songs!");
  });

});
