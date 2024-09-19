const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Crear libro
router.post('/', async (req, res) => {
  const { name, editorial, author, year, genre, pages } = req.body;
  const newBook = new Book({ name, editorial, author, year, genre, pages });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el libro' });
  }
});

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
});

// Obtener libro por id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro' });
  }
});

// Actualizar un libro
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
});

module.exports = router;
