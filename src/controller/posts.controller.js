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

module.exports = { getAll };
