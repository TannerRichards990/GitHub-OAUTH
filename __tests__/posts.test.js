const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');
const agent = request.agent(app);

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get allows authenticated user to see posts', async () => {
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toEqual(200);
  });

  it('post route should allow authenticated users to create post linked to their unique id', async () => {
    const testPost = {
      title: 'test post',
      content: 'test content',
    };

    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.post('/api/v1/posts').send(testPost);
    expect(res.status).toEqual(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "content": "test content",
        "id": "1",
        "title": "test post",
        "user_id": null,
      }
    `);
  });
  afterAll(() => {
    pool.end();
  });
});
