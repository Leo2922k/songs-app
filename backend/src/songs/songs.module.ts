import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { DbModule } from '../db/db.module'; 


@Module({
  imports: [DbModule],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule {}
