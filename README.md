# cs480
Repository for Database Systems Class at UIC (cs480)


# Running the project locally

1. Download python requirements from FlaskCacheApp
  Run `pip install -r requirements.txt` in the FlaskCacheApp directory

3. run all commands in `music_share_db.sql` in FlaskCacheApp

2. Setup env variables for server
  Have a .env.local file in the music-app directory
  set `SQL_PASSWORD = ` your-sql-password 
  set `SERVER_PORT = ` some 3-4 digit integer

3. Setup env variables for frontend
  Have a .env.local file in the frontend-music-app directory
  set `VITE_APP_BACKEND_URL = ` http://localhost:(SAME-AS-SERVER_PORT)

*You can split your terminal in vscode for the following steps*
4. Have a terminal run the server
  Run `npm install` in the /music-app directory
  Run `npm run dev` in the /music-app directory

4. Have a terminal run the frontend
  Run `npm install` in the /frontend-music-app directory.
  Run `npm run dev` in the /frontend-music-app directory.

