import db from '../../database/index.js';

class BooksRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT books.*, users.name AS user_name, users.phone AS user_phone, addresses.city AS user_city, addresses.state AS user_state
      FROM books
      LEFT JOIN users ON books.user_id = users.id
      LEFT JOIN addresses ON books.user_id = addresses.user_id
      ORDER BY books.title
    `);

    return rows;
  }

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
