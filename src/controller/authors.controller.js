const Authors = require("../models/authors.model");
const Posts = require("../models/posts.model");

const getAll = async (req, res) => {
  try {
    const authors = await Authors.selectAll();

    if (authors.length === 0) {
      return res.status(404).json({ message: "No authors found" });
    }

    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving authors: " + error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { authorId } = req.params;
    const author = await Authors.selectById(Number(authorId));
    if (!author)
      return res.status(404).json({ message: "Author ID does not exist" });
    res.json(author);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving author: " + error.message });
  }
};

const create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    const { name, email, image_url } = req.body;

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

const getAllPostByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const author = await Authors.selectById(Number(authorId));
    if (!author)
      return res.status(404).json({ message: "Author ID does not exist" });

    const posts = await Posts.selectAllPostsByAuthor(authorId);
    return res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving author posts: " + error.message });
  }
};

module.exports = { getAll, getById, create, getAllPostByAuthor };
