import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../service/app.service';
import { CreateUpdateMovieDto } from '../data/dtos/createUpdateMovie.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService

  const id = '123123123123123123123123'
  const request: CreateUpdateMovieDto = {
    name: 'movie',
    year: 1984,
    genres: ['horror'],
    ageLimit: 3,
    rating: 1,
    actors: [{ firstName: 'Brad', lastName: 'Pitt'}],
    director: { firstName: 'Stanley', lastName: 'Kubric' },
    synopsis: 'Some movie',
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, 
                  {
                    provide: AppService,
                    useValue: {
                      getMovies: jest.fn().mockReturnValue([]),
                      createMovie: jest.fn().mockReturnValue({}),
                      updateMovie: jest.fn().mockReturnValue({}),
                      deleteMovie: jest.fn().mockReturnValue({})
                    },
                  }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService)
  });

  describe('GET api/movies', () => {
    it('should call appService.getMovies', async () => {
      const movies = await appController.getMovies({ name: 'movie' })
      expect(appService.getMovies).toBeCalledWith({ name: 'movie' })
      expect(movies).toEqual([])
    });
  });

  describe('POST api/movies', () => {
    it('should call appService.createMovie', async () => {
      const createdMovie = await appController.createMovie(request)
      expect(appService.createMovie).toBeCalledWith(request)
      expect(createdMovie).toEqual({})
    });
  });

  describe('PUT api/movies', () => {
    it('should call appService.updateMovie', async () => {
      const updatedMovie = await appController.updateMovie(id, request)
      expect(appService.updateMovie).toBeCalledWith(id, request)
      expect(updatedMovie).toEqual({})
    });
  });

  describe('DELETE api/movies', () => {
    it('should call appService.deleteMovie', async () => {
      const deletedMovie = await appController.deleteMovie(id)
      expect(appService.deleteMovie).toBeCalledWith(id)
      expect(deletedMovie).toEqual({})
    });
  });
});
