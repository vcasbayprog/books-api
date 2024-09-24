# Book App Backend

Este es el backend de una aplicación de gestión de libros construida con Node.js, Express, y MongoDB.


## Configuración del entorno

1. Clonar el repositorio:
Ejecuta los siguientes comandos en tu terminal:
   
   git clone https://github.com/vcasbayprog/books-api-backend.git
   cd books-api-backend


2. Instalar dependencias:
Ejecuta el siguiente comando para instalar las dependencias necesarias:
npm install

3. Configurar el archivo de entorno:

Crea un archivo .env basado en el archivo .env.dist proporcionado:

cp .env.dist .env


4. Arrancar el servidor:

Ejecuta el siguiente comando para iniciar el servidor:

npm start


## DESCRIPCIÓN:
El backend expone una API RESTful para la gestión de libros. Las rutas disponibles son las siguientes:

GET /api/books: Obtiene todos los libros.
POST /api/books: Crea un nuevo libro (solo para usuarios autenticados).
PUT /api/books/:id: Edita un libro por su ID (solo para usuarios autenticados).
DELETE /api/books/:id: Elimina un libro por su ID (solo para usuarios autenticados).


## DEPENDENCIAS PRINCIPALES:
Express: Framework web para Node.js.
Mongoose: ODM (Object Data Modeling) para MongoDB.
Passport: Middleware de autenticación para Node.js.



