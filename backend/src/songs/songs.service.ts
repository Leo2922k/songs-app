import { Injectable, Inject } from '@nestjs/common';
import { eq, ilike } from 'drizzle-orm';
import { songs } from '../db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from "drizzle-orm";

@Injectable()
export class SongsService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  async getAll(page = 1, query = '') {
    const limit = 10;
    const offset = (page - 1) * limit;

    const where = query
      ? ilike(songs.title, `%${query}%`)
      : undefined;

    const data = await this.db
      .select()
      .from(songs)
      .where(where)
      .limit(limit)
      .offset(offset);

    const totalCountResult = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(songs)
      .where(where);

    const totalCount = Number(totalCountResult[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalPages,
      page,
    };
  }


  async addSong(data: { title: string; artist: string; cover_url?: string; genre?: string; song_url?: string }) {
    const [song] = await this.db
      .insert(songs)
      .values(data)
      .returning();
    return song;
  }

  async deleteSong(id: number) {
    const result = await this.db.delete(songs).where(eq(songs.id, id)).returning();
    if (result.length === 0) {
      return { message: 'Song not found' };
    }
    return { message: 'Deleted successfully' };
  }

}
