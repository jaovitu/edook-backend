import UsersRepository from "../repositories/UsersRepository.js";
import bcrypt from 'bcrypt';
class UserController {
  async store(request, response) {
    const { name, email, phone, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required!' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'Phone number is required!' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required!' });
    }

    const isEmailInUse = await UsersRepository.findByEmail({ email });

    if (isEmailInUse) {
      return response.status(400).json({ error: 'This email is already in use!' });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    const user = await UsersRepository.create({ name, email, phone, hashedPassword });

    response.status(201).json(user);
  }
}

export default new UserController();
