import React from "react";
import { useContext, useState } from "react";
import { endpointContext } from "../endpoints";
import { useNavigate } from "react-router";

export default function SongEntry({ song, username }) {
  const { addLikedSong } = useContext(endpointContext);

  const handleAddSong = (e) => {
    e.preventDefault()
    addLikedSong(song.song_id, username);
  }

  return (
    <tr>
      <td>{song.song_name}</td>
      <td>{song.artist_name}</td>
      <td>{song.duration}</td>
      <td>{song.album_name}</td>
      <td> 
        <button style={{width: 'fit-content'}} onClick={handleAddSong}>+</button>
  </td>
    </tr>
  );
}

