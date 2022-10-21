import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();      /** 
                                                        테스트용 어플리케이션을 생성하는 부분
                                                        실제 앱과 똑같이 pipe 설정을 해주어야 함.
                                                        */
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,               // decorator 형식에 없는 데이터를 거름
        forbidNonWhitelisted: true,    // 이상한 값이 오면 리퀘스트 자체를 막음
        transform: true,               // 받은 데이터 자동 형변환
      }), 
    );
    await app.init();
  });

  it('/ (GET)', () => {                    // URL에 대한 리퀘스트를 테스트
    return request(app.getHttpServer())    // 웹사이트 서버에 URL을 보냄
      .get('/')                            // URL
      .expect(200)                         // 리퀘스트에 대한 응답으로 200과
      .expect('Welcome to my Movie API');             // Hello World!를 받아야 함.
  });

  describe("/movies", () => {
    it("(GET)", () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)                           // 200: 요청 성공 코드. 리소스를 가져오는데 성공.
      .expect([]);
    });
    it("POST 201", () => {
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"Test",
        year: 2000,
        genres: ['test'],
      })
      .expect(201);                        // 201: 리소스를 새로 생성했다는 코드
    });
    it("POST 400", () => {                  // 400: 잘못된 요청
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"Test",
        year: 2000,
        genres: ['test'],
        other: 'thing',
      })
      .expect(400);                        // 201: 리소스를 새로 생성했다는 코드
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete("/movies")
      .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({ title: "UpdatedTest" })
      .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  });
});
