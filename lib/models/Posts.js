const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  content;
  user_id;

  constructor({ id, title, content, user_id }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user_id = user_id;
  }

  static async getALL() {
    const { rows } = await pool.query(`
      SELECT * FROM posts`);
    return rows.map((row) => new Post(row));
  }

  static async insert({ title, content, user_id }) {
    const { rows } = await pool.query(`
      INSERT INTO posts (title, content, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [title, content, user_id]);
    return new Post(rows[0]);
  }
};
