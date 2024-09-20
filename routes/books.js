const express = require('express');
const bookController = require('../controllers/bookController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

const router = express.Router();

// Rutas públicas
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Rutas protegidas (solo admin)
router.post('/', isAuthenticated, isAdmin, bookController.createBook);
router.put('/:id', isAuthenticated, isAdmin, bookController.updateBookById);
router.delete('/:id', isAuthenticated, isAdmin, bookController.deleteBookById);

module.exports = router;
