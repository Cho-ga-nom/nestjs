/**
 * service로 보내고 받을 인터페이스 export
 * entities에 데이터베이스 모델을 만든다.
 */

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}