import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsController, FilmsService } from './films';

@Module({
    imports: [],
    controllers: [AppController, FilmsController],
    providers: [AppService, FilmsService]
})
export class AppModule {}
