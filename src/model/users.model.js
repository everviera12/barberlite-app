const db = require("../../config/db");

const getAllUsers = async () => {
  const results = await db.query("SELECT * FROM users");
  return results.rows;
};

const getAllUsersByID = async (id) => {
  const results = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return results.rows[0];
};

module.exports = {
  getAllUsers,
  getAllUsersByID,
};
