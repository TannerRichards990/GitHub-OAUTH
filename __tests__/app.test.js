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
    const response = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      
    )
});
