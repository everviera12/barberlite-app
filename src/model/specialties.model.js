const db = require("../../config/db")

const getAllSpecialties = async () => {
  const results = await db.query("SELECT * FROM specialties");
  return results.rows;
};


module.exports = {
  getAllSpecialties
}