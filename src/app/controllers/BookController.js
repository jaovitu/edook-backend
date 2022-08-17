import dotenv from 'dotenv';
import aws from 'aws-sdk';

import BooksRepository from "../repositories/BooksRepository.js";

dotenv.config();

const S3 = new aws.S3();

class BookController {
  async store(request, response) {
    const { title, author, description, genre, userID } = request.body;
    const { location, key } = request.file;

    if ( !title || !author || !genre || !userID ) {
      S3.deleteObject({ Bucket: 'edookimages', Key: key }).promise();

      return response.status(400).json({ error: 'Missing required parameters!' });
    }

    response.json({ title, author, description, genre, imageURL: location, userID, key });
  }
}

export default new BookController();
