/**
 * controller, service를 부르는 파일
 */

import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController],                 // url을 가져오는 부분 
  providers: [MoviesService],
})
export class AppModule {}
