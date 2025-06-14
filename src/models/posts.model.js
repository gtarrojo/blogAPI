const db = require("../config/db");

const selectAll = async () => {
  const [result] = await db.query(`SELECT * FROM posts`);
  return result;
};

module.exports = { selectAll };
