import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films';
import { FilmsDBModule } from './filmsDB';

@Module({
    imports: [FilmsModule, MongooseModule.forRoot('mongodb://localhost:27017/local'), FilmsDBModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
