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
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const query = `
    CALL insert_user(
      $1, $2, $3, $4, $5, $6, 
      $7, $8, $9, $10, $11, $12, 
      $13, $14
    )
  `;

  const values = [
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
  ].filter((value) => value !== undefined);

  await db.query(query, values);
  return { ...userData, password: undefined };
};

const updateUser = async (userData) => {
  const hashedPassword = userData.password
    ? await bcrypt.hash(userData.password, 10)
    : undefined;

  const query = `
    CALL update_user(
      $1, $2, $3, $4, $5, $6, 
      $7, $8, $9, $10, $11, $12, 
      $13, $14, $15
    );
  `;

  const values = [
    userData.id,
    userData.first_name,
    userData.last_name,
    userData.email,
    userData.phone,
    userData.user_name,
    hashedPassword,
    userData.street,
    userData.neighborhood,
    userData.city,
    userData.state,
    userData.zip,
    userData.profile_picture,
    userData.birth_date,
    userData.gender,
  ].filter((value) => value !== undefined);

  try {
    await db.query(query, values);
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
};

const deleteUser = async (id) => {
  await db.query("CALL delete_user($1)", [id]);
  return { success: true, message: "User deleted successfully" };
};

module.exports = {
  getAllUsers,
  getAllUsersByID,
  addNewUser,
  updateUser,
  deleteUser,
};
