

## running locally

1.Download python requirements from FlaskCacheApp
`pip install -r requirements.txt`
In music-app run:
`npm install`


2.Change the password in app.js in /music-app to your own mysql password.

3.run all commands in `music_share_db.sql` in FlaskCacheApp
  if you would like to do it in the terminal, navigate to the FlaskCacheApp directory and run: `sudo mysql -u root -p < music_share_db.sql`

4.Run the node server in music-app
`node app.js` or `npm run dev`

For examples on how to use the endpoints listed in app.js, you can look at __tests__ to find some working examples. 