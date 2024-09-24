const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);
const swaggerJsdoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();

// Habilita CORS
app.use(cors({
  origin: 'http://localhost:3000' // Permite solo esta ruta
}));

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      description: 'API para gestionar libros',
      contact: {
        name: 'Víctor',
        email: 'vcasbayprog@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
