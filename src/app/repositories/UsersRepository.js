import db from '../../database/index.js';

class UsersRepository {
  async findById({ id }) {
    const [ row ] = await db.query(`
      SELECT users.*, addresses.city, addresses.state
      FROM users
      LEFT JOIN addresses ON users.id = addresses.user_id
      WHERE users.id = $1
    `, [id]);

    return row;
  }

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
