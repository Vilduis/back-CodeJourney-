const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth"); // Aquí importamos el middleware de autenticación
const { upload } = require("../middleware/upload");
const {
  createPostController,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  getPostsByUserController,
} = require("../controller/postController");
const { validatePost } = require("../middleware/postValidator"); // Validación de post

router.post("/create", authenticateJWT, upload.single("image"), validatePost, createPostController);
router.get("/", getPostsController);
router.get("/user/posts", authenticateJWT, getPostsByUserController);
router.get("/:postId", getPostByIdController);
router.put("/:postId", authenticateJWT, upload.single("image"), validatePost, updatePostController);
router.delete("/:postId", authenticateJWT, deletePostController);
module.exports = router;
