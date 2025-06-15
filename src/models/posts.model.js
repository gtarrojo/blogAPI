const db = require("../config/db");

const selectAll = async () => {
  const [result] = await db.query(`SELECT
    p.idposts,
    p.title,
    p.description,
    p.created_at,
    p.category,
    JSON_OBJECT(
        'idauthor', a.idauthors,
        'name', a.name,
        'email', a.email,
        'image_url', a.image_url
    ) AS author
FROM
    posts AS p
JOIN
    authors AS a ON p.authors_idauthors = a.idauthors;`);
  return result;
};

const selectById = async (postId) => {
  const [result] = await db.query(
    `SELECT
    p.idposts,
    p.title,
    p.description,
    p.created_at,
    p.category,
    JSON_OBJECT(
        'idauthor', a.idauthors,
        'name', a.name,
        'email', a.email,
        'image_url', a.image_url
    ) AS author
FROM
    posts AS p
JOIN
    authors AS a ON p.authors_idauthors = a.idauthors
    WHERE p.idposts = ?;`,
    [postId]
  );

  if (result.length === 0) return null;
  return result[0];
};

module.exports = { selectAll, selectById };
