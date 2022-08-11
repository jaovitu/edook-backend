import UsersRepository from "../repositories/UsersRepository.js";
import AddressesRepository from "../repositories/AddressesRepository.js";
import bcrypt from 'bcrypt';
class UserController {
  async show(request, response) {
    const { id } = request.params;

    const user = await UsersRepository.findById({ id });

    if (!user) {
      return response.status(404).json({ error: 'User not found.' });
    }

    delete user.password;

    response.json(user);
  }

  async store(request, response) {
    const { name, email, phone, password, city, state } = request.body;

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

    if (!city) {
      return response.status(400).json({ error: 'City is required!' });
    }

    if (!state) {
      return response.status(400).json({ error: 'State is required!' });
    }

    const isEmailInUse = await UsersRepository.findByEmail({ email });

    if (isEmailInUse) {
      return response.status(400).json({ error: 'This email is already in use!' });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    const user = await UsersRepository.create({ name, email, phone, hashedPassword });

    delete user.password;

    const { id: user_id } = user;

    const userAddress = await AddressesRepository.create({ city, state, user_id });

    delete userAddress.user_id;

    response.status(201).json({ ...user, ...userAddress });
  }
}

export default new UserController();
