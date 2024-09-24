# Book App Backend

Este es el backend de una aplicación de gestión de libros construida con Node.js, Express, y MongoDB.

## Configuración del entorno
1. Clonar el repositorio:
   ABRIR UN BASH
   git clone <https://github.com/vcasbayprog/books-api-backend.git>
   cd books-api-backend

## instalar dependencias
npm install

## Configurar el archivo de entorno

Crear un archivo .env en la raíz del proyecto basado en el archivo .env.dist
cp .env.dist .env

## Arrancar el servidor:

npm start


## DESCRIPCIÓN:
El backend expone una API para gestionar libros que incluye las siguientes rutas:

GET /api/books: Obtiene todos los libros.
POST /api/books: Crea un nuevo libro (solo para usuarios autenticados).
PUT /api/books/: Edita un libro (solo para usuarios autenticados).
DELETE /api/books/: Elimina un libro (solo para usuarios autenticados).


## DEPENDENCIAS PRINCIPALES:
Express
Mongoose
Passport



