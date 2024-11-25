// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import EndpointContextProvider from "./endpoints.jsx";
import SiteContextProvider from "./domain/siteContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EndpointContextProvider>
      <SiteContextProvider>
        <App />
      </SiteContextProvider>
    </EndpointContextProvider>
  </BrowserRouter>
);
