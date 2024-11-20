import { Routes, Route } from "react-router-dom";
import Home from "./home/home";
import Login from "./login/login";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
