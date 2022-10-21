import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {                     // 테스트 전에 실행되는 코드
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);           // getAll()이 배열을 리턴하는지 테스트
    })
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({                      // getOne() 테스트를 위한 더미 데이터 생성
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();        // movie 데이터가 존재하는지 테스트
      expect(movie.id).toEqual(1);        // 요청한 아이디에 맞는 데이터가 반환되었는지 테스트
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch(e) {                                       // 에러를 검출하는지 테스트
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({                      
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
     const beforeCreate = service.getAll().length;
      service.create({                      
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      });
      
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("shouold update a movie", () => {
      service.create({                      
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: "Updated Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
