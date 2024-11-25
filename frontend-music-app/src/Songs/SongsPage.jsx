import Search from "../components/search";
import SongEntry from "./SongEntry";
import "./songs.css"
export default function SongsPage() {
  const exampleSong = {
    name: "Katamari",
    artist: "Femtanyl",
    duration: "a short time",
    album: "Chaser",
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
      <Search />
      <div className="all-songs">
        <table className="all-songs-table">
          <thead>
            <tr>
              <th className="col name">Name</th>
              <th className="col artist">Artist</th>
              <th className="col duration">Duration</th>
              <th className="col albumn">Album</th>
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
