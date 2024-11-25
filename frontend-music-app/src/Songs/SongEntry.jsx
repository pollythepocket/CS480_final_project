import React from "react";

export default function SongEntry({song}) {
  const {name, artist, duration, albumn} = song
  return (
    <tr className="entry-row">
      <td className="col name">{name}</td>
      <td className="col artist">{artist}</td>
      <td className="col duration">{duration}</td>
      <td className="col albumn">{albumn}</td>
    </tr>
  );
}
