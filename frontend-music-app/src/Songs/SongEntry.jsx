import React from "react";

export default function SongEntry({ song }) {
  return (
    <tr>
      <td>{song.song_name}</td>
      <td>{song.artist_name}</td>
      <td>{song.duration}</td>
      <td>{song.album_name}</td>
    </tr>
  );
}

