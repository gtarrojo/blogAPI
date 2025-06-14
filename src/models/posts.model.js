const db = require("../config/db");

const selectAll = async () => {
  const [result] = await db.query(`SELECT * FROM posts`);
  return result;
};

const selectById = async (postId) => {
  const [result] = await db.query("select * from posts where idposts = ?", [
    postId,
  ]);

  if (result.length === 0) return null;
  return result[0];
};

module.exports = { selectAll, selectById };
