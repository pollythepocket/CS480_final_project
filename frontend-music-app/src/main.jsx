// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import EndpointContextProvider from "./endpoints.jsx";

createRoot(document.getElementById("root")).render(
  <EndpointContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </EndpointContextProvider>
);
