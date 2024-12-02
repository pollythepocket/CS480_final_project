import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import "./App.css";
import SongsPage from "./Songs/SongsPage";
import LikedSongsPage from "./likedSongs/likedSongs";
import PostSongPage from "./postSong/postSong";
import AdminView from "./admin/adminView";
import AdminPostSong from "./admin/adminPostSong";
import AdminSongsPage from "./admin/AdminSongsPage";

import { useContext, useEffect } from "react";
import { endpointContext } from "./endpoints";
import Notification from "./components/notification";

function App() {
  const { signedIn } = useContext(endpointContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Sign in check");
    if (!signedIn) {
      console.log("User hasn't joined a room");
      navigate("/login", { replace: true });
    }
    console.log("Not signed in, re-routing");
  }, [navigate, signedIn]);
  return (
    <>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/songs" element={<SongsPage />} />
        <Route path="/LikedSongs" element={<LikedSongsPage />} />
        <Route path="/PostSong" element={<PostSongPage />} />

        <Route path="/admin" element={<AdminView />} />
        <Route path="/admin/manage" element={<AdminPostSong />} />
        <Route path="/admin/songs" element={<AdminSongsPage />} />
      </Routes>
    </>
  );
}

export default App;
