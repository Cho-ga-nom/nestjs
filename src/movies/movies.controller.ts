/**
 * url을 받아오고 함수를 호출하는 파일.
 * route 역할
 */


import { Controller, Get, Post, Param, Delete, Patch, Body, Query } from '@nestjs/common';
import { query } from 'express';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie-dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
    getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }
  
  @Delete(":id")
  remove(@Param('id') movieId:number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(movieId, updateData);
  }
}
