import { Routes, Route, Router } from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import "./App.css";
import SongsPage from "./Songs/SongsPage";
import LikedSongsPage from "./likedSongs/likedSongs";
import PostSongPage from "./postSong/postSong";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Songs" element={<SongsPage/>} />
      <Route path="/LikedSongs" element={<LikedSongsPage/>} />
      <Route path="/PostSong" element={<PostSongPage/>} />
    </Routes>
  );
}

export default App;
