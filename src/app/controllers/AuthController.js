import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

import UsersRepository from "../repositories/UsersRepository.js";

class AuthController {
  async authenticate(request, response) {
    const { email, password } = request.body;
    const { JWT_SECRET } = process.env;

    if (!email) {
      return response.status(400).json({ error: 'Email is required!' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required!' });
    }

    const user = await UsersRepository.findByEmail({ email });

    if (!user) {
      return response.status(401).json({ error: 'User nor found!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({ error: 'Invalid password!' });
    }

    try {
      const token = jwt.sign( { id: user.id }, JWT_SECRET );

      response.json({ token });

    } catch(err) {
      console.log(err);
      response.status(500).json({ error: 'Something went wrong!' });
    }
  }
}

export default new AuthController();
