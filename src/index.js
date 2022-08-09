import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.get('/', (req, res) => {
  res.json({ ok: 'Working...' });
});

app.listen(SERVER_PORT, () => console.log(`Server is running at port ${SERVER_PORT}...`));
