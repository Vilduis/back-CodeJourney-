const {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../services/commentService");

const createCommentController = async (req, res) => {
  try {
    const commentData = {
      content: req.body.content,
      author: req.user.userId,
      post: req.params.postId,
    };

    const newComment = await createComment(commentData);
    res.status(201).json({ message: "Comment created successfully", newComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentsByPostIdController = async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentByIdController = async (req, res) => {
  try {
    const comment = await getCommentById(req.params.commentId);
    res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCommentController = async (req, res) => {
  try {
    const comment = await getCommentById(req.params.commentId);
    if (comment.author._id.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ error: "You can only update your own comments" });
    }
    const updatedComment = await updateComment(req.params.commentId, req.body);
    res.status(200).json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const comment = await getCommentById(req.params.commentId);
    if (comment.author._id.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ error: "You can only delete your own comments" });
    }
    const deletedComment = await deleteComment(req.params.commentId);
    res.status(200).json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommentController,
  getCommentsByPostIdController,
  getCommentByIdController,
  updateCommentController,
  deleteCommentController,
};
