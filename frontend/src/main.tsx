import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongsList from "./pages/SongsList";
import Login from "./pages/Login";
import AddSong from "./pages/AddSong";
import { AuthProvider } from "./context/AuthContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
  
  
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SongsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-song" element={<AddSong />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  
);
