import db from '../../database/index.js';

class BooksRepository {
  async create({ title, author, description, genre, imageURL, userID }) {
    const [ row ] = await db.query(`
      INSERT INTO books (title, author, description, genres, image_url, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [title, author, description, genre,, imageURL, userID]);

    return row;
  }
}

export default new BooksRepository();
