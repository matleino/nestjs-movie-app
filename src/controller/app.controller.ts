import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { CreateUpdateMovieDto } from '../data/dtos/createUpdateMovie.dto';
import { MovieDocument } from '../database/models/movie.model';
import { GetMoviesQueryDto } from '../data/dtos/getMovies.query.dto';

@Controller('api/movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 
   * @returns array of found movies
   */
  @Get()
  async getMovies(@Query() query: GetMoviesQueryDto): Promise<MovieDocument[]> {
    return this.appService.getMovies(query);
  }
  
  /**
   * 
   * @param data data of a movie to be created
   * @returns data of the newly created movie if operation succeeds
   */
  @Post()
  async createMovie(@Body() data: CreateUpdateMovieDto): Promise<MovieDocument> {
    return this.appService.createMovie(data);
  }
  
  /**
   * 
   * @param id id value of the movie that will be updated
   * @param data data of a movie to be updated
   * @returns data of the updated movie if operation succeeds
   */
  @Put(':id')
  async updateMovie(@Param() id: string, @Body() data: CreateUpdateMovieDto): Promise<MovieDocument> {
    return this.appService.updateMovie(id, data);
  }

  /**
   * 
   * @param id id value of the movie that will be deleted
   * @returns data of the deleted movie if operation succeeds
   */
  @Delete(':id')
  async deleteMovie(@Param() id: string): Promise<MovieDocument> {
    return this.appService.deleteMovie(id)
  }
}
