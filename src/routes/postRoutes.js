const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const {
  createPostController,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  getPostsByUserController,
} = require("../controller/postController");
const { validatePost } = require("../middleware/postValidator");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Creación y gestión de posts
 */

/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content, image]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post creado
 *       401:
 *         description: No autorizado
 */
router.post("/create", authenticateJWT, upload.single("image"), validatePost, createPostController);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtener todos los posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", getPostsController);

/**
 * @swagger
 * /api/posts/user/posts:
 *   get:
 *     summary: Obtener los posts del usuario autenticado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts del usuario
 *       401:
 *         description: No autorizado
 */
router.get("/user/posts", authenticateJWT, getPostsByUserController);

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Obtener un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post con comentarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado
 */
router.get("/:postId", getPostByIdController);

/**
 * @swagger
 * /api/posts/{postId}:
 *   put:
 *     summary: Actualizar un post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post actualizado
 *       401:
 *         description: No autorizado
 */
router.put("/:postId", authenticateJWT, upload.single("image"), validatePost, updatePostController);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Eliminar un post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post eliminado
 *       401:
 *         description: No autorizado
 */
router.delete("/:postId", authenticateJWT, deletePostController);

module.exports = router;
