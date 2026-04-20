const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Comment content is required"],
    trim: true,
    minlength: [2, "Comment content must be at least 2 characters"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
}, {
  timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
