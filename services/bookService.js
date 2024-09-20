const bookRepository = require('../repositories/bookRepository');

// Crear un nuevo libro
const createBook = async (bookData) => {
  try {
    const newBook = await bookRepository.createBook(bookData);
    return newBook;
  } catch (error) {
    throw new Error('Error al crear el libro');
  }
};

// Obtener todos los libros
const getAllBooks = async () => {
  try {
    const books = await bookRepository.getAllBooks();
    return books;
  } catch (error) {
    throw new Error('Error al obtener los libros');
  }
};

// Obtener un libro por su ID
const getBookById = async (id) => {
  try {
    const book = await bookRepository.getBookById(id);
    if (!book) throw new Error('Libro no encontrado');
    return book;
  } catch (error) {
    throw new Error('Error al obtener el libro');
  }
};

// Actualizar un libro
const updateBookById = async (id, updateData) => {
  try {
    const updatedBook = await bookRepository.updateBookById(id, updateData);
    if (!updatedBook) throw new Error('Libro no encontrado');
    return updatedBook;
  } catch (error) {
    throw new Error('Error al actualizar el libro');
  }
};

// Eliminar un libro
const deleteBookById = async (id) => {
  try {
    const deletedBook = await bookRepository.deleteBookById(id);
    if (!deletedBook) throw new Error('Libro no encontrado');
    return deletedBook;
  } catch (error) {
    throw new Error('Error al eliminar el libro');
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
    