const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/githubService.js');
const agent = request.agent(app);

describe('github-oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const response = await agent
      .get('/api/v1/github/login')
      .redirects(1);

    expect(response.body).toEqual({
      id: expect.any(String),
      username: 'test',
      email: 'test@test.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number)
    }
    );
  });
});
