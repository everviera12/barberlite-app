const usersModel = require('../model/users.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();  
    res.status(200).json(users);
  } catch (error) {
    console.error("Error ", error); 
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getAllUsers,  
};
