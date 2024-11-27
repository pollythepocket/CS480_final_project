import React, { useContext, useState, useEffect } from "react";
import Search from "../components/search";
import SongEntry from "./SongEntry";
import "./songs.css";
import { endpointContext } from "../endpoints";
import { Toolbar } from "primereact/toolbar";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export default function SongsPage() {
  const { getAllSongs } = useContext(endpointContext);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const location = useLocation();
  const username = location.state;

  const defaultSearch = (e) => {
    getAllSongs('/songs?sort=asc')
      .then((fetchedSongs) => {
        setFilteredSongs(fetchedSongs); 
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
  
    const stringQuery = `/songs?name=${query}&sort=asc`;

    console.log(stringQuery);
  
    getAllSongs(stringQuery)
      .then((fetchedSongs) => {
        setFilteredSongs(fetchedSongs); 
      })
      .catch((err) => {
        console.error('Error searching songs:', err); 
        setError(err.message);
      });
  
    console.log(`Searching for ${query} in ${option}`); 
  };
  

  return (
    <div className="song-page">
      <>
        <Toolbar
          className="toolbar"
          left={
            <button type="submit" className="taskbar-button" onClick={() => navigate("/songs", { state: username })}>
              Home
            </button>
          }
          right={
            <button type="submit" className="taskbar-button" onClick={() => navigate("/LikedSongs", { state: username })}>
              Liked Songs
            </button>
          }
        />
      </>
      <h1>Songs</h1>
      <Search username={username} onSearch={handleSearch} />
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
                <th className="col add" style={{ width: "30px" }}>Add</th>
              </tr>
            </thead>
            <tbody>
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <SongEntry key={song.song_id} song={song} username={username} />
                ))
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
