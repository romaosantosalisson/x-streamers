import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter basename="/x-streamers">
=======
    <HashRouter>
>>>>>>> a76e3f7 (:ambulance: Hotfix: Deploy and routes)
      <App />
    </HashRouter>
  </StrictMode>,
);
