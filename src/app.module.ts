import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controller/app.controller';
import { Movie, MovieSchema } from './database/models/movie.model';
import { AppService } from './service/app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
    MongooseModule.forFeature(
      [
          {name: Movie.name, schema: MovieSchema}
      ]
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
