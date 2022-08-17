import dotenv from 'dotenv';
dotenv.config();

import multer from "multer";
import crypto from 'crypto';
import path from 'path';

import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const awsS3 = multerS3({
  s3: new aws.S3(),
  bucket: 'edookimages',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',

  key: (request, file, callback) => {
    const filenameHash = crypto.randomBytes(16).toString('hex');
    const filename = `${filenameHash}-${file.originalname}`;

    return callback(null, filename);
  }
});

export default {
  directory: uploadsFolder,
  storage: awsS3,

  fileFilter: (request, file, callback) => {
    const allowedMimes = [ 'image/jpeg', 'image/pjpeg', 'image/png' ];

    if ( allowedMimes.includes(file.mimetype) ) {
      callback(null, true);

    } else {
      callback( new Error('Invalid file type!') );
    }
  }
}
