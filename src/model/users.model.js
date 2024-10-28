const db = require("../../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const results = await db.query("SELECT * FROM users");
  return results.rows;
};

const getAllUsersByID = async (id) => {
  const results = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return results.rows[0];
};

const addNewUser = async (userData) => {

  // password hashead
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const results = await db.query(
    "CALL insert_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
    [
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.phone,
      hashedPassword,
      userData.street,
      userData.neighborhood,
      userData.city,
      userData.state,
      userData.zip,
      userData.profile_picture,
      userData.birth_date,
      userData.gender,
      userData.user_name,
    ]
  );
  return results.rows[0];
};

module.exports = {
  getAllUsers,
  getAllUsersByID,
  addNewUser,
};
