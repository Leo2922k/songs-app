import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Artist cannot be empty' })
  artist: string;

  @IsOptional()
  @IsUrl({}, { message: 'Cover URL must be a valid URL' })
  cover_url?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Song URL must be a valid URL' })
  song_url?: string;

  @IsOptional() 
  genre?: string;
}
