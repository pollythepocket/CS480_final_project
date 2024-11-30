import React, { useContext, useState, useEffect } from "react";
import Search from "../components/search";
import LikedSongEntry from "./likedSongEntry";
import "./likedSongs.css";
import { endpointContext } from "../endpoints";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Toolbar from "../components/toolbar";

export default function LikedSongs() {
  const { getLikedSongs } = useContext(endpointContext);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState(null);
  const [totalSongs, setTotalSongs] = useState(0);
  const [totalDuration, setTotalDuration] = useState("0:00");


  let navigate = useNavigate();
  const location = useLocation();
  const username = location.state;

  const getConsts = (songs) => {
    let totalSeconds = 0;
  
    for (let i = 0; i < songs.length; i++) {
      if (!songs[i].duration || !songs[i].duration.includes(":")) {
        console.warn(`Skipping song with invalid duration:`, songs[i]);
        continue; 
      }
  
      const [minutes, seconds] = songs[i].duration.split(":").map(Number);
      if (isNaN(minutes) || isNaN(seconds)) {
        console.warn(`Invalid duration format for song:`, songs[i]);
        continue; 
      }
  
      totalSeconds += minutes * 60 + seconds;
    }
  
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
  
    const formattedDuration =
      hours > 0
        ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        : `${minutes}:${seconds.toString().padStart(2, "0")}`;
  
    setTotalSongs(songs.length);
    setTotalDuration(formattedDuration);
  };
  
  
  

  useEffect(() => {
    getLikedSongs(username)
      .then((fetchedSongs) => {
        setSongs(fetchedSongs);
        setFilteredSongs(fetchedSongs); 
        getConsts(fetchedSongs); // Update stats
      })
      .catch((err) => setError(err.message));
  }, [getLikedSongs, username]); 
  

  const handleSearch = (query, option) => {
    const lowerQuery = query.toLowerCase();
    const filtered = songs.filter((song) =>
      song[option]?.toLowerCase().includes(lowerQuery)
    );
    setFilteredSongs(filtered);
    getConsts(filtered);
  };
  
  

  return (
    <div className="song-page">
      <Toolbar username={username}/>
      <h1>{username}'s Songs</h1>
      <Search
        username={username}
        onSearch={handleSearch}
        duration={totalDuration}
        number={totalSongs}
      />

      {error && <p className="error-message">Error: {error}</p>}
      <div className="all-songs">
        <div className="table-container">
          <table className="all-songs-table">
            <thead>
              <tr>
                <th className="col name">Name</th>
                <th className="col artist">Artist</th>
                <th className="col duration">Duration</th>
                <th className="col album">Album</th>
                <th className="col add" style={{ width: '30px' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => <LikedSongEntry key={song.song_id} song={song} username={username} />)
              ) : (
                <tr>
                  <td colSpan="5">No songs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
