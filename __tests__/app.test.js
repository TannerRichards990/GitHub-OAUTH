const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
jest.mock('../lib/services/github');


describe('github-oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should login and redirect users to /api/v1/github/oauth', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(/https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i);
  });
  
  it('/api/v1/github/callback should login users and redirect to dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      login: 'fake_github_user',
      email: 'faker@example.com',
      avatar: null,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
