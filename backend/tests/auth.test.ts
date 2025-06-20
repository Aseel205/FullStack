import request from 'supertest';
import app, { startServer } from '../server';
import mongoose from 'mongoose';
import { Server } from 'http';

describe('User authentication', () => {
  let server: Server;

  beforeAll(async () => {
    server = await startServer();
    await mongoose.connection.collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email: 'testuser@example.com',
      username: 'testuser123',
      password: 'securePassword123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User created' });
  });

  it('should login a user and return a token', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser123',
      password: 'securePassword123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser123',
      password: 'wrongPassword',
    });

    expect(response.status).toBe(401);
  });
});
