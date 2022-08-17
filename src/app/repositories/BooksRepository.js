import db from '../../database/index.js';

class BooksRepository {
  async create({ title, author, description, genre, imageURL, awsImageKey, userID }) {
    const [ row ] = await db.query(`
      INSERT INTO books (title, author, description, genre, image_url, aws_image_key, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [title, author, description, genre, imageURL, awsImageKey, userID]);

    return row;
  }
}

export default new BooksRepository();
