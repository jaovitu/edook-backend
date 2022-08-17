import BooksRepository from "../repositories/BooksRepository.js";

class BookController {
  async store(request, response) {
    const { teste } = request.body;

    console.log(request.file);

    response.json({ ok: teste });
  }
}

export default new BookController();
