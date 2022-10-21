/**
 * Movie 기능을 수행하는 모듈.
 * 이 모듈에 MoviesController, MoviesService가 포함.
 * App 모듈에서 이 모듈을 import하여 앱 구동시 합쳐줌.
 */

import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
