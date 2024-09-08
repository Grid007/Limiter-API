// test/app.test.js
const request = require('supertest');
const app = require('../index'); // Import the app instance

describe('API Rate Limiter', () => {
  it('should limit requests to the /api/data endpoint', async () => {
    for (let i = 0; i < 100; i++) {
      await request(app).get('/api/data');
    }
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toBe(429); // Too Many Requests
    expect(res.text).toBe('Too many requests from this IP, please try again later.');
  });

  it('should allow requests to non-API routes', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Welcome to the API Rate Limiter!');
  });
});
