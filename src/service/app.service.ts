import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUpdateMovieDto } from '../data/dtos/createUpdateMovie.dto';
import { GetMoviesQueryDto } from '../data/dtos/getMovies.query.dto';
import { MovieEntity } from '../data/entities/movie.entity';
import { MoviesData } from '../data/seed/movies.data';
import { Movie, MovieDocument } from '../database/models/movie.model';

@Injectable()
export class AppService implements OnModuleInit{

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ){}

  async getMovies(query: GetMoviesQueryDto): Promise<MovieDocument[]> {
    let queryObject: object
    if (query.name) {
      queryObject = {
        name: { "$regex": query.name, "$options": "i" }
      }
    }
    return this.movieModel.find(queryObject).exec()
  }

  async createMovie(data: CreateUpdateMovieDto): Promise<MovieDocument> {
    const createdMovie = new this.movieModel(data)
    return createdMovie.save()
  }

  async updateMovie(id: string, data: CreateUpdateMovieDto): Promise<MovieDocument> {
    const updatedMovie = this.movieModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), data)
    return updatedMovie
  }

  async deleteMovie(id: string): Promise<MovieDocument> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    if (!deletedMovie) {
      throw new Error("Not found")
    }
    return deletedMovie
  }

  async onModuleInit() {
    const existingData = await this.movieModel.find().exec()
    if (existingData.length === 0) {
      for(let i = 0; i < MoviesData.length; i++ ){
        const movie = new MovieEntity
        (
          MoviesData[i].name,
          MoviesData[i].year,
          MoviesData[i].genres,
          MoviesData[i].ageLimit,
          MoviesData[i].rating,
          MoviesData[i].actors,
          MoviesData[i].director,
          MoviesData[i].synopsis,
        )
        const createdMovie = new this.movieModel(movie)
        createdMovie.save()
      }
    }
  }
}