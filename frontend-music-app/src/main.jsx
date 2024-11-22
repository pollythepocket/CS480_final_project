// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import EndpointContextProvider from "./endpoints.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EndpointContextProvider>
      <App />
    </EndpointContextProvider>
  </BrowserRouter>
);
