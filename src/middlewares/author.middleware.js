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
    res
      .status(500)
      .json({ error: "Internal server error while checking email." });
  }
};

module.exports = { checkEmailExists };
