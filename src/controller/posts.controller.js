const Authors = require("../models/authors.model");
const Posts = require("../models/posts.model");

const getAll = async (req, res) => {
  try {
    const posts = await Posts.selectAll();

    if (posts.length === 0) {
      return res.status(404).json({ message: "No authors found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving authors: " + error.message });
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

    const { title, description, category, author_name, author_email } =
      req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing required field: name" });
    }
    if (!email) {
      return res.status(400).json({ error: "Missing required field: email" });
    }
    if (!image_url) {
      return res
        .status(400)
        .json({ error: "Missing required field: image_url" });
    }

    const result = await Authors.insert({ name, email, image_url });

    if (result && result.insertId) {
      const newAuthor = await Authors.selectById(result.insertId);
      return res.status(201).json(newAuthor);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating author, insert operation failed." });
  }
};

module.exports = { getAll, getById, create };
