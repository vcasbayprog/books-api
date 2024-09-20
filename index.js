const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Inicializar Passport
app.use(passport.initialize());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de libros
app.use('/api/books', bookRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API de libros funcionando');
});

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

