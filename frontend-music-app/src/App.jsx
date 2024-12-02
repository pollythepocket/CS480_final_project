import { Routes, Route } from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import "./App.css";
import SongsPage from "./Songs/SongsPage";
import LikedSongsPage from "./likedSongs/likedSongs";
import PostSongPage from "./postSong/postSong";
import AdminView from "./admin/adminView";
import AdminPostSong from "./admin/adminPostSong";
import AdminSongsPage from "./admin/AdminSongsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/songs" element={<SongsPage/>} />
      <Route path="/LikedSongs" element={<LikedSongsPage/>} />
      <Route path="/PostSong" element={<PostSongPage/>} />
      
      <Route path="/admin" element={<AdminView/>} />
      <Route path="/admin/manage" element={<AdminPostSong/>} />
      <Route path="/admin/songs" element={<AdminSongsPage/>} />
    </Routes>
  );
}

export default App;
