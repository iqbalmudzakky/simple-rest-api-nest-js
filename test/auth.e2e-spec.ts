import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Sequelize } from 'sequelize-typescript';

describe('Auth E2E', () => {
  let app: INestApplication;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get Sequelize instance and sync database
    sequelize = app.get<Sequelize>(Sequelize);
    await sequelize.sync({ force: true }); // This will drop and recreate tables
  });

  afterAll(async () => {
    await sequelize.close();
    await app.close();
  });

  it('should reject access without token', async () => {
    await request(app.getHttpServer()).get('/posts').expect(401);
  });

  it('should login and access protected route', async () => {
    // 1. Create a test user
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    // 2. Login to get JWT token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    const token = loginResponse.body.access_token;
    expect(token).toBeDefined();

    // 3. Access protected route with token
    await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
