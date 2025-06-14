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

module.exports = { getAll, getById };
