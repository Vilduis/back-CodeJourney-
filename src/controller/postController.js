const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
} = require("../services/postService");

const { cloudinary } = require("../middleware/upload");

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
        public_id: file.originalname.split(".")[0],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });

const isPostAuthor = (post, userId) => {
  const authorId = post.author._id ? post.author._id.toString() : post.author.toString();
  return authorId === userId;
};

const createPostController = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "No user authenticated" });
    }

    let imageUrl = req.body.image;
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.secure_url;
    }

    const newPost = await createPost({ ...req.body, image: imageUrl, author: req.user.userId });
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsController = async (_req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostByIdController = async (req, res) => {
  try {
    const post = await getPostById(req.params.postId);
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePostController = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "No user authenticated" });
    }

    const existingPost = await getPostById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!isPostAuthor(existingPost, req.user.userId)) {
      return res.status(403).json({ error: "You can only update your own posts" });
    }

    let updateData = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      updateData.image = result.secure_url;
    }

    const updatedPost = await updatePost(req.params.postId, updateData);
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePostController = async (req, res) => {
  try {
    const existingPost = await getPostById(req.params.postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!isPostAuthor(existingPost, req.user.userId)) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    const deletedPost = await deletePost(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsByUserController = async (req, res) => {
  try {
    const posts = await getPostsByUser(req.user.userId);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPostController,
  getPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  getPostsByUserController,
};
