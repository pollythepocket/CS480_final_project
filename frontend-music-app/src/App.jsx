import { Routes, Route, Router } from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import "./App.css";
import SongsPage from "./Songs/SongsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Songs" element={<SongsPage/>} />
    </Routes>
  );
}

export default App;
