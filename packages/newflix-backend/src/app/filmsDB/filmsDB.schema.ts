import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type FilmDBDocument = FilmDB & Document;

@Schema()
@ApiTags('create-filmDB')
export class CreateFilmDB {
    @Prop()
    @ApiProperty()
    releaseDate: string | null;

    @Prop()
    @ApiProperty()
    title: string;

    @Prop()
    @ApiProperty()
    id: string;

    @Prop()
    @ApiProperty()
    description: string;

    @Prop([String])
    @ApiProperty()
    genre: string[];

    @Prop()
    @ApiProperty()
    duration: string;
}

@Schema()
@ApiTags('FilmDB')
export class FilmDB {
    @Prop()
    @ApiProperty()
    title: string;

    @Prop()
    @ApiProperty()
    id: number;

    // @Prop()
    // tagline: string;

    @Prop()
    @ApiProperty()
    vote_average: number;

    // @Prop()
    // vote_count: number;

    @Prop()
    @ApiProperty()
    release_date: string;

    @Prop()
    @ApiProperty()
    poster_path: string;

    @Prop()
    @ApiProperty()
    overview: string;

    // @Prop()
    // budget: number;
    //
    // @Prop()
    // revenue: number;

    @Prop([String])
    @ApiProperty()
    genres: string[];

    @Prop()
    @ApiProperty()
    runtime: number;
}

export const FilmDBSchema = SchemaFactory.createForClass(FilmDB);
