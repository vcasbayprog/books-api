const Book = require('../models/Book');

// Función para crear un libro
const createBook = (bookData) => {
  const book = new Book(bookData);
  return book.save();
};

// Función para obtener todos los libros
const getAllBooks = () => {
  return Book.find();
};

// Función para obtener un libro por su ID
const getBookById = (id) => {
  return Book.findById(id);
};

// Función para actualizar un libro
const updateBookById = (id, updateData) => {
  return Book.findByIdAndUpdate(id, updateData, { new: true });
};

// Función para eliminar un libro
const deleteBookById = (id) => {
  return Book.findByIdAndDelete(id);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
