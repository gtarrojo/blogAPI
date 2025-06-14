const db = require("../config/db");

const selectAll = async () => {
  const [result] = await db.query(`SELECT * FROM authors`);
  return result;
};

const selectById = async (authorId) => {
  const [result] = await db.query("select * from authors where idauthors = ?", [
    authorId,
  ]);

  if (result.length === 0) return null;
  return result[0];
};

const insert = async ({ name, email, image_url }) => {
  const [result] = await db.query(
    `insert into authors (name, email, image_url) values (?, ? ,?)`,
    [name, email, image_url]
  );
  return result;
};

module.exports = { selectAll, selectById, insert };
