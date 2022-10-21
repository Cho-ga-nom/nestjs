/**
 * controller, service를 부르는 파일
 * 여러 모듈을 하나로 모아주는 앱 전체 모듈.
 * Movies모듈을 import한 상태.
 */

import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],                 // url을 가져오는 부분 
  providers: [],
})
export class AppModule {}
