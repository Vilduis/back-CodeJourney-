// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth");
const { validateComment } = require("../middleware/commentValidator");
const {
  createCommentController,
  getCommentsByPostIdController,
  getCommentByIdController,
  updateCommentController,
  deleteCommentController,
} = require("../controller/commentController");

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Gestión de comentarios en posts
 */

/**
 * @swagger
 * /api/comments/create/{postId}:
 *   post:
 *     summary: Agregar un comentario a un post
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 minLength: 2
 *     responses:
 *       201:
 *         description: Comentario creado
 *       401:
 *         description: No autorizado
 */
router.post("/create/:postId", authenticateJWT, validateComment, createCommentController);

/**
 * @swagger
 * /api/comments/post/{postId}:
 *   get:
 *     summary: Obtener todos los comentarios de un post
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/post/:postId", getCommentsByPostIdController);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   get:
 *     summary: Obtener un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentario no encontrado
 */
router.get("/:commentId", getCommentByIdController);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     summary: Editar un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *       401:
 *         description: No autorizado
 */
router.put("/:commentId", authenticateJWT, validateComment, updateCommentController);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       401:
 *         description: No autorizado
 */
router.delete("/:commentId", authenticateJWT, deleteCommentController);

module.exports = router;
