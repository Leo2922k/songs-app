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

docker compose up --build

docker compose exec backend npm run migrate
docker compose exec backend npm run seed:spotify 
