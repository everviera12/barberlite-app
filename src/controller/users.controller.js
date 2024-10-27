const usersModel = require("../model/users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Intern server error");
  }
};

const getAllUsersByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.getAllUsersByID(id);
    // console.log(user);
    
    if (!user) {
      return res.status(404).send("Cliente not founded");
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(400).send("Client ID not valid");
    }

    console.error("Error ", error);
    res.status(500).send("Intern server error");
  }
};

module.exports = {
  getAllUsers,
  getAllUsersByID,
};
