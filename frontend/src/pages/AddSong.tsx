// src/pages/AddSong.tsx
import { useState } from "react";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "../pages/layout";
import logo from "../assets/addSong.png"; 

export default function AddSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover_url, setCoverUrl] = useState("");
  const [song_url, setSongUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized — login first.");
        return;
      }

      await api.post(
        "/songs",
        { title, artist, cover_url, song_url, genre },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Song added successfully!");
      setTitle("");
      setArtist("");
      setCoverUrl("");
      setSongUrl("");
      setGenre("");
    } catch (err: any) {
      setMessage("❌ Failed to add song");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-dvh">
        <Card className="p-6 w-96">
        <div className="flex items-center justify-center gap-4">
          <img src={logo} alt="signin" className="h-30 w-30 object-contain" />
        </div>
          <CardContent className="flex flex-col space-y-3">
            <h2 className="text-xl font-semibold text-center">Add Song</h2>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <Input placeholder="Cover URL" value={cover_url} onChange={(e) => setCoverUrl(e.target.value)} />
            <Input placeholder="Song URL" value={song_url} onChange={(e) => setSongUrl(e.target.value)} />
            <Input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <Button onClick={handleSubmit}>Add Song</Button>
            {message && <p className="text-sm text-center mt-2">{message}</p>}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
