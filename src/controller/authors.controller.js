const Authors = require("../models/authors.model");
const Post = require("../models/posts.model");

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

module.exports = { getAll };
