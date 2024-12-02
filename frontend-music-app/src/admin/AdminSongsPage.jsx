import React, { useContext, useState, useEffect } from "react";
import Search from "../components/search";
import "../Songs/songs.css";
import { endpointContext } from "../endpoints";
import AdminToolbar from "../components/adminToolbar";
import { useLocation } from "react-router-dom";

export default function AdminSongsPage() {
  const { getAllSongs } = useContext(endpointContext);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState(null);
  const [totalSongs, setTotalSongs] = useState(0);
  const [totalDuration, setTotalDuration] = useState("0:00");

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

  const defaultSearch = (e) => {
    getAllSongs('/songs?sort=asc')
      .then((fetchedSongs) => {
        setFilteredSongs(fetchedSongs); 
        getConsts(fetchedSongs);
      })
      .catch((err) => {
        console.error('Error searching songs:', err); 
        setError(err.message);
      });
  }

  useEffect(() => {
    defaultSearch();
  }, []); 
  
  const handleSearch = (query, option) => {
    if (!query || !option) {
      defaultSearch();
      return;
    }
  
    const stringQuery = `/songs?name=${query}&search=${option}&sort=asc`;
  
    getAllSongs(stringQuery)
      .then((fetchedSongs) => {
        setFilteredSongs(fetchedSongs); 
        getConsts(fetchedSongs);
      })
      .catch((err) => {
        console.error('Error searching songs:', err); 
        setError(err.message);
      });
  };

  return (
    <div className="song-page">
      <AdminToolbar username={username}/>
      <h1>Library Songs</h1>
      <Search username={username} onSearch={handleSearch} number={totalSongs} duration={totalDuration}/>
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
              </tr>
            </thead>
            <tbody>
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <tr key={song.song_id}>
                    <td>{song.song_name}</td>
                    <td>{song.artist_name}</td>
                    <td>{song.duration}</td>
                    <td>{song.album_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No songs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
