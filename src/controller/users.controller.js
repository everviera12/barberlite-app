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

const addNewUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    street,
    neighborhood,
    city,
    state,
    zip,
    profile_picture,
    birth_date,
    gender,
    user_name,
  } = req.body;

  try {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !password ||
      !street ||
      !neighborhood ||
      !city ||
      !state ||
      !zip ||
      !profile_picture ||
      !birth_date ||
      !gender ||
      !user_name
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // object whit all data user
    const userData = {
      first_name,
      last_name,
      email,
      phone,
      password,
      street,
      neighborhood,
      city,
      state,
      zip,
      profile_picture,
      birth_date,
      gender,
      user_name,
    };

    console.log("New client data:", userData);

    // add new client to the db
    const newClient = await usersModel.addNewUser(userData);

    return res.status(201).json({ message: "Client created successfully.", client: userData });;

  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }
    console.error("Error ", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllUsers,
  getAllUsersByID,
  addNewUser,
};
