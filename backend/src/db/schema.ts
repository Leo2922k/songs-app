import { pgTable, serial, text, varchar, boolean } from "drizzle-orm/pg-core";

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  artist: varchar("artist", { length: 255 }).notNull(),
  cover_url: text("cover_url"),
  genre: varchar("genre", { length: 100 }), 
  song_url: text("song_url"),
});