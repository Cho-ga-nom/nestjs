/**
 * movieData의 타입 지정
 */
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;
  
  @IsOptional()
  @IsString({ each: true })          // 배열이라 각각 검사
  readonly genres: string[];
}