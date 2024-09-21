const express = require('express');
const bookController = require('../controllers/bookController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const Book = require('../models/Book');
const router = express.Router();

// Rutas públicas
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Rutas protegidas (solo admin)
router.post('/', isAuthenticated, isAdmin, bookController.createBook);
router.put('/:id', isAuthenticated, isAdmin, bookController.updateBookById);
router.delete('/:id', isAuthenticated, isAdmin, bookController.deleteBookById);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - name
 *         - editorial
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: ID del libro
 *         name:
 *           type: string
 *           description: Nombre del libro
 *         editorial:
 *           type: string
 *           description: Editorial del libro
 *         author:
 *           type: string
 *           description: Autor del libro
 *         year:
 *           type: integer
 *           description: Año de publicación
 *         genre:
 *           type: string
 *           description: Género del libro
 *         pages:
 *           type: integer
 *           description: Número de páginas del libro
 *       example:
 *         name: "prueba"
 *         editorial: "prueba"
 *         author: "prueba"
 *         year: 2024
 *         genre: "prueba"
 *         pages: 100
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Error al guardar el libro
 */
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

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Error al obtener los libros
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Obtener un libro por su ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al obtener el libro
 */
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Actualizar un libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al actualizar el libro
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Libro no encontrado' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro a eliminar
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al eliminar el libro
 */
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
