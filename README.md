/\*\*

- Nota: Para mayor seguridad en un entorno de producción, lo ideal sería trabajar con UUIDs y aplicar técnicas de encriptación adecuadas.
  \*\*/

# Dependencias de Producción

## express

Framework para construir la API.

## mysql2

Para interactuar con mySQL

## dotenv

Variables de entorno

## cors

Para interactuar con mi API en caso de necesitarlo

# API Endpoints

## Autores (/api/authors)

### GET /api/authors

**Descripción:** Obtiene una lista de todos los autores.  
**Controlador:** `authorsController.getAll` (authors.controller.js)  
**Respuesta exitosa:** 200 OK con un array de objetos de autores.  
**Respuesta de error:** 404 Not Found si no hay autores, 500 Internal Server Error para otros errores.

### GET /api/authors/:authorId

**Descripción:** Obtiene un autor específico por su authorId.  
**Controlador:** `authorsController.getById` (authors.controller.js)  
**Parámetros de ruta:**

- `authorId` (Number): El ID del autor a obtener.

**Respuesta exitosa:** 200 OK con el objeto del autor.  
**Respuesta de error:** 404 Not Found si el autor no existe, 500 Internal Server Error.

### GET /api/authors/:authorId/posts

**Descripción:** Obtiene todos los posts escritos por un autor específico.  
**Controlador:** `authorsController.getAllPostByAuthor` (authors.controller.js)  
**Parámetros de ruta:**

- `authorId` (Number): El ID del autor cuyos posts se quieren obtener.

**Respuesta exitosa:** 200 OK con un array de objetos de posts del autor.  
**Respuesta de error:** 404 Not Found si el autor no existe o no tiene posts, 500 Internal Server Error.

### POST /api/authors

**Descripción:** Crea un nuevo autor.  
**Controlador:** `authorsController.create` (authors.controller.js)  
**Middleware:** `checkEmailExists` (author.middleware.js) - verifica que el email no esté ya registrado.  
**Cuerpo de la solicitud (JSON):** Datos del nuevo autor.  
**Respuesta exitosa:** 201 Created con el objeto del nuevo autor.  
**Respuesta de error:** 400 Bad Request si faltan campos o el cuerpo está vacío, 409 Conflict si el email ya existe, 500 Internal Server Error.

## Posts (/api/posts)

### GET /api/posts

**Descripción:** Obtiene una lista de todos los posts, incluyendo la información del autor de cada post.  
**Controlador:** `postsController.getAll` (posts.controller.js)  
**Respuesta exitosa:** 200 OK con un array de objetos de posts.  
**Respuesta de error:** 404 Not Found si no hay posts, 500 Internal Server Error.

### GET /api/posts/:postId

**Descripción:** Obtiene un post específico por su postId, incluyendo la información del autor.  
**Controlador:** `postsController.getById` (posts.controller.js)  
**Parámetros de ruta:**

- `postId` (Number): El ID del post a obtener.

**Respuesta exitosa:** 200 OK con el objeto del post.  
**Respuesta de error:** 404 Not Found si el post no existe, 500 Internal Server Error.

### POST /api/posts

**Descripción:** Crea un nuevo post. Requiere que el autor (identificado por email) ya exista.  
**Controlador:** `postsController.create` (posts.controller.js)  
**Middleware:** `authorExistsByEmail` (author.middleware.js) - verifica que el autor con el email proporcionado exista.  
**Cuerpo de la solicitud (JSON):** Datos del nuevo post.  
**Respuesta exitosa:** 201 Created con el objeto del nuevo post.  
**Respuesta de error:** 400 Bad Request si faltan campos o el email del autor, 404 Not Found si el autor con el email proporcionado no existe, 500 Internal Server Error.
