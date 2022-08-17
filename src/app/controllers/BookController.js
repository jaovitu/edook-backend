import dotenv from 'dotenv';
import aws from 'aws-sdk';

import BooksRepository from "../repositories/BooksRepository.js";

dotenv.config();

const S3 = new aws.S3();

class BookController {
  async index(request, response) {
    const books = await BooksRepository.findAll();

    response.json(books);
  }

  async findByGenre(request, response) {
    const { genre } = request.params;

    if (!genre) {
      return response.status(400).json({ error: 'Genre is required!' });
    }

    const books = await BooksRepository.findByGenre({ genre: genre.trim().replace(/^\w/, (c) => c.toUpperCase()) });

    if ( books.length === 0 ) {
      return response.status(404).json({ message: 'Nothing to show.' });
    }

    response.json(books);
  }

  async store(request, response) {
    const { title, author, description, genre, userID } = request.body;
    const { location, key } = request.file;

    if ( !title || !author || !genre || !userID ) {
      S3.deleteObject({ Bucket: 'edookimages', Key: key }).promise();

      return response.status(400).json({ error: 'Missing required parameters!' });
    }

    const book = await BooksRepository.create({
      title,
      author,
      description,
      genre,
      imageURL: location,
      awsImageKey: key,
      userID
    });

    response.json(book);
  }
}

export default new BookController();
