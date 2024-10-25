const db = require("../../config/db");

const getAllUsers = async () => {
  const results = await db.query("SELECT * FROM users");
  return results.rows;
};

module.exports = {
  getAllUsers,  
};
