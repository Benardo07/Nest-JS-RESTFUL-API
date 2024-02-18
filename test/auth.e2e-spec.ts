import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handles register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'sakata1',
        email: 'kintoki6sdd1@mail.com',
        password: 'test',
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body.name).toBe('sakata1');
        expect(body.email).toBe('kintoki6sdd1@mail.com');
      });
  });

  it('logged in after register (POST)', async () => {
    const email = 'kintoki9@mail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'sakata',
        email,
        password: 'test',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
