import axios from "axios";
import * as dotenv from "dotenv";
import { db } from "./db"; 
import { songs } from "./schema";

dotenv.config();

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const resp = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return resp.data.access_token;
}

async function fetchPlaylist() {
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID!;
  const token = await getAccessToken();

  const res = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=40`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.items;
}

async function seed() {

    const items = await fetchPlaylist();

  let count = 0;
  for (const item of items) {
    const track = item.track;

    if (!track) continue;

    await db.insert(songs).values({
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      cover_url: track.album.images[0]?.url || "",
      genre: "Unknown", 
      song_url: track.external_urls.spotify,
    });

    count++;
  }

  console.log(`Inserted ${count} songs.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
