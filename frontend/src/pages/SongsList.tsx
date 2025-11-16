import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import api  from "../api/axios";
import Layout from "../pages/layout";
import { LayoutGrid, List } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import deleteRed from "../assets/deleteRed.svg"; 
import deleteWhite from "../assets/deleteWhite.svg"; 
import { useAuth } from "@/context/AuthContext";
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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const { isAdmin } = useAuth();

  useEffect(() => {
    api
      .get("/songs", {
        params: {
          page,
          query
        }
      })
      .then((res) => {
        setSongs(res.data.data || res.data); 
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => console.error(err));
  }, [page, query]);


  const shell = "w-full mx-auto max-w-screen-2xl";
  const content = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  const fetchSongs = () => {
  api
    .get("/songs", {
      params: { page, query }
    })
    .then((res) => {
      setSongs(res.data.data || res.data);
      setTotalPages(res.data.totalPages || 1);
    })
    .catch((err) => console.error(err));
};


  const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this song?")) return;

  try {
    await api.delete(`/songs/${id}`);
    fetchSongs();  
  } catch (err) {
    console.error(err);
  }
  };


  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-between items-center mb-6 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold">All Songs</h2>
            <input
            placeholder="Search songs"
            className="px-4 py-2 rounded-md bg-slate-800 text-slate-100 focus:outline-none border border-slate-700 w-full max-w-xs ml-4"
            value={query}
            onChange={(e) => {
              setPage(1);          
              setQuery(e.target.value);
            }}
            />
        </div>

        <div className={shell}>
          <div className={content}>
            {songs.map((song) =>
              (
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
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{song.title}</h3>
                    <p className="text-sm text-gray-400">{song.artist}</p>

                    {song.genre && (
                      <p className="text-xs text-gray-500">#{song.genre}</p>
                    )}  
                  </div>

                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(song.id);
                    }}
                    className="group p-1 rounded-md transition"
                  >
                    <img
                      src={deleteWhite}
                      className="w-5 h-5 group-hover:hidden"
                    />
                    <img
                      src={deleteRed}
                      className="w-5 h-5 hidden group-hover:block"
                    />
                  </button>
                )}


                </div>
              </CardContent>

              </Card>

              ) 
            )}
          </div>
        </div>
        <div className="w-full flex justify-center mt-8 gap-6 items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-slate-200 text-lg font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </Layout>
  );
}
