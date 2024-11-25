import React, { useContext, useState, useEffect } from "react";
import Search from "../components/search";
import SongEntry from "./SongEntry";
import "./songs.css";
import { endpointContext } from "../endpoints";

export default function SongsPage() {
  const { getAllSongs } = useContext(endpointContext);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllSongs()
      .then((fetchedSongs) => {
        console.log(fetchedSongs); 
        setSongs(fetchedSongs);
      })
      .catch((err) => setError(err.message));
  }, [getAllSongs]);
  

  return (
    <div className="song-page">
      <h1>Songs</h1>
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
                songs.map((song) => <SongEntry key={song.song_id} song={song} />)
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
