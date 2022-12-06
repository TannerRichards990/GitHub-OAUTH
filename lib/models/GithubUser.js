const pool = require('../utils/pool');

class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.login = row.login;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async findUser(login) {
    const { rows } = await pool.query(`
      SELECT * FROM github_users where login = $1`, [login]);
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }

  static async insert({ login, email, avatar }) {
    if (!login) throw new Error('username is required');
    const { rows } = await pool.query(`
      INSERT INTO github_users
        (login, email, avatar)
        VALUES ($1, $2, $3)
        RETURNING *`, [login, email, avatar]);
    if (!rows[0]) throw new Error('No user found');
    return new GithubUser(rows[0]);
  }
}

module.exports = { GithubUser };
