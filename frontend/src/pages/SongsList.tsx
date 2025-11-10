import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import api  from "../api/axios";
import Layout from "../pages/layout";
import { LayoutGrid, List } from "lucide-react";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover_url?: string;
  genre?: string;
  song_url?: string;
}

export default function SongsList() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    api.get("/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-between items-center mb-6 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold">All Songs</h2>

          <button
            onClick={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            className="p-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700 transition"
            aria-label="Toggle view mode"
          >
            {viewMode === "grid" ? <List size={20} /> : <LayoutGrid size={20} />}
          </button>
        </div>
        
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-[repeat(auto-fit,400px)] justify-center gap-x-10 gap-y-12 w-full max-w-[1800px] mx-auto"
              : "flex flex-col divide-y divide-slate-700 w-full max-w-[1800px] mx-auto"
          }
        >
          {songs.map((song) =>
            viewMode === "grid" ? (
              <Card
                key={song.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-slate-800 text-slate-100"
              >
                {song.cover_url && (
                  <img
                    src={song.cover_url}
                    alt={song.title}
                    className="w-[400px] h-[400px] object-cover rounded-xl"
                  />
                )}
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  {song.genre && (
                    <p className="text-xs text-gray-500 mt-1">#{song.genre}</p>
                  )}
                  {song.song_url && (
                    <a
                      href={song.song_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm mt-2 inline-block hover:underline"
                    >
                      ▶️ Listen
                    </a>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div
                key={song.id}
                className="flex items-center justify-center gap-10 py-6 px-8 hover:bg-slate-800/60 rounded-lg transition w-full"
              >
                {song.cover_url && (
                  <img
                    src={song.cover_url}
                    alt={song.title}
                    className="h-[400px] w-[400px] object-cover rounded-xl"
                  />
                )}
                <div className="flex-1 min-w-0 max-w-[600px]">
                  <h3 className="text-2xl font-semibold mb-2">{song.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">{song.artist}</p>
                  {song.genre && <p className="text-xs text-gray-500">#{song.genre}</p>}
                </div>
                {song.song_url && (
                  <a
                    href={song.song_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline shrink-0"
                  >
                    ▶️ Listen
                  </a>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
