import multer from "multer";
import crypto from 'crypto';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  directory: uploadsFolder,
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, uploadsFolder);
    },

    filename: (request, file, callback) => {
      const filenameHash = crypto.randomBytes(16).toString('hex');
      const filename = `${filenameHash}-${file.originalname}`;

      return callback(null, filename);
    }
  }),

  fileFilter: (request, file, callback) => {
    const allowedMimes = [ 'image/jpeg', 'image/pjpeg', 'image/png' ];

    if ( allowedMimes.includes(file.mimetype) ) {
      callback(null, true);

    } else {
      callback( new Error('Invalid file type!') );
    }
  }
}
