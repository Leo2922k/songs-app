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

  // put this near the top of the component
  const shell = "w-full mx-auto max-w-screen-2xl";
  const content =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      : "flex flex-col gap-4 divide-y divide-slate-700";

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-between items-center mb-6 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold">All Songs</h2>

          <button
            onClick={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            className="p-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700 transition hidden sm:inline-block"
            aria-label="Toggle view mode"
          >
            {viewMode === "grid" ? <List size={20} /> : <LayoutGrid size={20} />}
          </button>
        </div>

        <div className={shell}>
        <div className={content}>
          {songs.map((song) =>
            viewMode === "grid" ? (
            <Card
              key={song.id}
              onClick={() => window.open(song.song_url, "_blank")}
              className="
                relative overflow-hidden cursor-pointer rounded-xl
                bg-slate-800 text-slate-100 transition-all duration-300
                hover:scale-[1.03] hover:shadow-3xl
              "
            >
              {song.cover_url && (
                <div className="relative">
                  <img
                    src={song.cover_url}
                    alt={song.title}
                    className="w-[400px] h-[400px] object-cover rounded-xl transition-all duration-300 hover:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300" />
                </div>
              )}

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
                {song.genre && (
                  <p className="text-xs text-gray-500 mt-1">#{song.genre}</p>
                )}
              </CardContent>
            </Card>

            ) : (
              /**/ 

            <Card
              key={song.id}
              onClick={() => window.open(song.song_url, "_blank")}
              className="
                flex flex-row items-center
                overflow-hidden cursor-pointer rounded-xl
                bg-slate-800 text-slate-100
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-2xl
              "
            >
              {song.cover_url && (
                <div className="relative flex-shrink-0">
                  <img
                    src={song.cover_url}
                    alt={song.title}
                    className="w-100 h-100 object-cover rounded-l-xl transition-all duration-300 hover:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300" />
                </div>
              )}

              <CardContent className="p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
                {song.genre && (
                  <p className="text-xs text-gray-500 mt-1">#{song.genre}</p>
                )}
              </CardContent>
            </Card>

              /**/ 
            )
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
}
