# Nocturne

Small full-stack app where users can browse songs (title, artist, cover, genre, link), search & filter, and an admin can log in and add/remove songs.

---

## Tech Stack

- **Frontend:** React + Vite, TypeScript, TailwindCSS, shadcn/ui  
- **Backend:** NestJS (TypeScript), Drizzle ORM  
- **DB:** PostgreSQL (Docker)  
- **Auth:** JWT (admin only)

Main features:
- List songs with cover & artist
- Search by title/artist
- Filter by genre
- Pagination (12 per page)
- Admin login to add/delete songs

---

## How to Run (with Docker)

1. **Clone the repo**

```bash
git clone <this-repo-url>
cd CM_P01_SongsApp
```

2. Backend env
Create backend/.env:
```bash
DATABASE_URL=postgres://admin:admin@localhost:5432/songsdb
JWT_SECRET=secret123
PORT=3000
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_PLAYLIST_ID=your_list_id
```

3. **Build & start everything**
```bash
docker compose up --build
```

4. **Build & start everything**
```bash
docker compose exec backend npm run migrate
docker compose exec backend npm run seed:spotify 
```
