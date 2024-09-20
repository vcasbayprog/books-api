const bookService = require('../services/bookService');

// Crear un nuevo libro (solo admin)
const createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json({
      //probando otra forma diferente para que muestre un texto con mensaje de exito
      message: 'Libro creado exitosamente',
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los libros (public)
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un libro por su ID (public)
const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un libro (solo admin)
const updateBookById = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBookById(req.params.id, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un libro (solo admin)
const deleteBookById = async (req, res) => {
  try {
    await bookService.deleteBookById(req.params.id);
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
