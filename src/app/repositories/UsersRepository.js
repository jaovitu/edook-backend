import db from '../../database/index.js';

class UsersRepository {
  async findByEmail({ email }) {
    const [ row ] = await db.query(`
      SELECT *
      FROM users
      WHERE users.email = $1
    `, [email]);

    return row;
  }

  async create({ name, email, phone, hashedPassword }) {
    const [ row ] = await db.query(`
      INSERT INTO users (name, email, phone, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, hashedPassword]);

    return row;
  }
}

export default new UsersRepository();
