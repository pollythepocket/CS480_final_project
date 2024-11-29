import React from "react";
import { useContext, useState } from "react";
import { endpointContext } from "../endpoints";
import { useNavigate } from "react-router";

export default function LikedSongEntry({ song, username }) {


  const { deleteLikedSong } = useContext(endpointContext);
  let navigate = useNavigate();

  const handleDeleteSong = (e) => {
    e.preventDefault()
    deleteLikedSong(song.song_id, username);
    navigate('/LikedSongs', { state: username });
  
  }

  return (
    <tr>
      <td>{song.song_name}</td>
      <td>{song.artist_name}</td>
      <td>{song.duration}</td>
      <td>{song.album_name}</td>
      <td> 
        <button style={{width: 'fit-content'}} onClick={handleDeleteSong}>-</button>
      </td>
    </tr>
  );
}

