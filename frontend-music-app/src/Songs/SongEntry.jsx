import React from "react";

export default function SongEntry({song}) {
  const {name, artist, duration, albumn} = song
  return (
    <tr>
      <td>{name}</td>
      <td>{artist}</td>
      <td>{duration}</td>
      <td>{albumn}</td>
    </tr>
  );
}
