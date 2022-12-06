const pool = require('../lib/utils/pool');

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
};
