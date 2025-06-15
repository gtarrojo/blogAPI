const Authors = require("../models/authors.model");
const Posts = require("../models/posts.model");

const getAll = async (req, res) => {
  try {
    const posts = await Posts.selectAll();

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts: " + error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.selectById(Number(postId));
    if (!post)
      return res.status(404).json({ message: "Post ID does not exist" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving post: " + error.message });
  }
};

const create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    const { title, description, category, email } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Missing required field: title" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ error: "Missing required field: description" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ error: "Missing required field: category" });
    }
    if (!email) {
      return res.status(400).json({ error: "Missing required field: email" });
    }

    const result = await Posts.insert({ title, description, category, email });

    if (result && result.insertId) {
      const newPost = await Posts.selectById(result.insertId);
      return res.status(201).json(newPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating post, insert operation failed." });
  }
};

module.exports = { getAll, getById, create };
