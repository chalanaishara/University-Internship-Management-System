import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.interceptors.request.use((config) => {
  config.url = config.url.replace("http://localhost:5000", API_URL);
  return config;
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);