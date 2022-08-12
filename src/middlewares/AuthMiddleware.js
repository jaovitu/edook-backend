import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { JWT_SECRET } = process.env;

export default function(request, response, next) {
  const { authorization } = request.headers;

  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return response.status(401).json({ error: 'Access denied!' });
  }

  try {
    jwt.verify( token, JWT_SECRET );
    next()

  } catch (err) {
    response.status(401).json({ error: 'Invalid token!' });
  }
}
