import { Controller, Get, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

 @Get()
  getAll(
    @Query('page') pageNum: number,
    @Query('search') search: string,
    @Query('genre') genre: string,
  ) {
    return this.songsService.getAll(pageNum, search || '', genre || '');
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addSong(@Body() body: CreateSongDto, @Request() req) {
    if (!req.user?.isAdmin) {
      throw new UnauthorizedException('Only admins can add songs');
    }
    return this.songsService.addSong(body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteSong(@Param('id') id: string, @Request() req) {
    if (!req.user?.isAdmin) {
      throw new UnauthorizedException('Only admins can delete songs');
    }
    return this.songsService.deleteSong(parseInt(id, 10));
  }
}
