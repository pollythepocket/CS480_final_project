import React, { useContext, useState, useEffect } from "react";
import Search from "../components/search";
import LikedSongEntry from "./likedSongEntry";
import "./likedSongs.css";
import { endpointContext } from "../endpoints";
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function LikedSongs() {
  const { getLikedSongs } = useContext(endpointContext);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const location = useLocation();
  const username = location.state;

  const routeChange = () => {
    let path = '/songs';
    navigate(path, {state: username});
  }  

  const routeChangeToLikedList = () => {
    let path = '/LikedSongs';
    navigate(path, {state: username});
  } 

  useEffect(() => {
    getLikedSongs(username)
      .then((fetchedSongs) => {
        setSongs(fetchedSongs);
      })
      .catch((err) => setError(err.message));
  }, [getLikedSongs, username]); 
  
  

  return (
    <div className="song-page">
      <>
      <Toolbar className="toolbar" left={
          <button type="submit" className="taskbar-button" onClick={routeChange}>Home</button>
        } right = {
          <button type="submit" className="taskbar-button" onClick={routeChangeToLikedList}>Liked Songs</button>
        } />
      </>
      <h1>{username}'s Songs</h1>
      <Search />
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
              {songs.length > 0 ? (
                songs.map((song) => <LikedSongEntry key={song.song_id} song={song} />)
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
