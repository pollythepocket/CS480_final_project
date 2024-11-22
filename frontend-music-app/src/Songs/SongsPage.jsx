import SongEntry from "./SongEntry";
import "./songs.css"
export default function SongsPage() {
  const exampleSong = {
    name: "Katamari",
    artist: "Femtanyl",
    duration: "a short time",
    albumn: "Chaser",
  };
  let exampleSongList = [
    exampleSong,
    exampleSong,
    exampleSong,
    exampleSong,
  ]
  return (
    <div className="song-page">
      <h1>Songs</h1>
      <div className="all-songs">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Albumn</th>
            </tr>
          </thead>
          <tbody>
            {exampleSongList.map((song, index) => <SongEntry key={index} song={song} /> )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
