const db = require("../../config/db");

const getAllSpecialties = async () => {
  const results = await db.query("SELECT * FROM specialties");
  return results.rows;
};

const checkSpecialtyExists = async (specialtyName) => {
  const query = `SELECT * FROM specialties WHERE specialties_name = $1`;
  const result = await db.query(query, [specialtyName]);

  if (result.rows.length > 0) {
    return result.rows[0];
  }

  return null;
};

const addNewSpecialty = async (userData) => {
  const query = `CALL insert_specialty($1)`;
  const values = [userData.specialties_name];
  await db.query(query, values);
  return { ...userData };
};

const updateSpecialty = async (userData) => {
  const query = `CALL update_specialty($1, $2)`;
  const values = [userData.id, userData.specialties_name];
  const result = await db.query(query, values);
  return result;
};

const deleteSpecialty = async (id) => {
  const query = `CALL delete_specialty($1)`;
  const value = [id];
  const result = await db.query(query, value);
  return result;
};

module.exports = {
  getAllSpecialties,
  addNewSpecialty,
  checkSpecialtyExists,
  updateSpecialty,
  deleteSpecialty,
};
