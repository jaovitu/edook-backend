import BooksRepository from "../repositories/BooksRepository.js";

class BookController {
  async store(request, response) {
    response.json({ ok: true });
  }
}

export default new BookController();
