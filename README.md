# CodeJourney — API Backend

API REST para una plataforma de blog donde los usuarios pueden publicar posts, subir imágenes y dejar comentarios.

## Qué hace

- Los usuarios se registran e inician sesión con autenticación JWT
- Los usuarios autenticados pueden crear, editar y eliminar sus propios posts (con imagen)
- Cualquier usuario puede comentar en los posts; cada autor puede editar o eliminar sus propios comentarios
- Las imágenes se almacenan en la nube mediante Cloudinary

## Stack

| Capa | Tecnología |
|---|---|
| Runtime | Node.js + Express |
| Base de datos | MongoDB Atlas + Mongoose |
| Autenticación | JWT + bcryptjs |
| Subida de archivos | Multer + Cloudinary |
| Validación | express-validator |
| Deploy | Vercel (serverless) |

## Endpoints

```
POST   /api/users/register       Registrar usuario
POST   /api/users/login          Iniciar sesión — devuelve token JWT
GET    /api/users/profile        Ver perfil propio (requiere auth)
PUT    /api/users/update/:id     Actualizar perfil (requiere auth)

GET    /api/posts                Listar todos los posts
GET    /api/posts/:id            Ver un post con sus comentarios
POST   /api/posts/create         Crear post (requiere auth + imagen)
PUT    /api/posts/:id            Editar post (requiere auth)
DELETE /api/posts/:id            Eliminar post (requiere auth)

GET    /api/comments/post/:id    Ver comentarios de un post
POST   /api/comments/create/:id  Comentar en un post (requiere auth)
PUT    /api/comments/:id         Editar comentario (requiere auth)
DELETE /api/comments/:id         Eliminar comentario (requiere auth)
```

## Instalación local

```bash
# Instalar dependencias
npm install

# Copiar y completar las variables de entorno
cp .env.example .env

# Iniciar servidor en desarrollo
npm run dev
```

### Variables de entorno necesarias

```env
MONGO_URI=tu_cadena_de_conexion_mongodb_atlas
JWT_SECRET=tu_secreto_jwt
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=5000
```
