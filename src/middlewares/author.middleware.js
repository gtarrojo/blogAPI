const Authors = require("../models/authors.model");

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return next();
  }

  try {
    const existingAuthor = await Authors.selectByEmail(email);
    if (existingAuthor) {
      return res
        .status(409)
        .json({ error: "An author with this email already exists." });
    }
    next();
  } catch (error) {
    console.error("Error in checkEmailExists middleware:", error);
    res
      .status(500)
      .json({ error: "Internal server error while checking email." });
  }
};

const authorExistsByEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Author email is required" });
  }

  try {
    const author = await Authors.selectByEmail(email);
    if (!author) {
      return res
        .status(404)
        .json({ error: "Author does not exist. Register author first" });
    }

    next();
  } catch (error) {
    console.error("Error in ensureAuthorExistsByEmail middleware:", error);
    res.status(500).json({
      error: "Internal server error while verifying author existence.",
    });
  }
};

module.exports = { checkEmailExists, authorExistsByEmail };
