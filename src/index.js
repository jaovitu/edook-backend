import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/userRoutes.js';
import booksRoutes from './routes/booksRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(userRoutes);
app.use(booksRoutes);

app.get('/', (request, response) => {
  response.send('API online - Edook: uma comunidade em torno da leitura');
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));
