import db from '../../database/index.js';

class AddressesRepository {
  async create({ city, state, user_id }) {
    const [ row ] = await db.query(`
      INSERT INTO addresses (city, state, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [city, state, user_id]);

    return row;
  }
}

export default new AddressesRepository();
