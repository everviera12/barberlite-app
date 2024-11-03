const { handleErrorResponse } = require("../../public/javascript/handleErrorResponse");
const usersModel = require("../model/users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      results: users,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getAllUsersByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.getAllUsersByID(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Client found",
      client: user
    });

  } catch (error) {
    if (error.code === "22P02") {
      return res
        .status(400)
        .json({ success: false, message: "Client ID not valid" });
    }

    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addNewUser = async (req, res) => {
  const requiredFields = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    street: req.body.street,
    neighborhood: req.body.neighborhood,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    profile_picture: req.body.profile_picture,
    birth_date: req.body.birth_date,
    gender: req.body.gender,
    user_name: req.body.user_name,
  };

  const missingFields = Object.keys(requiredFields).filter((key) => !requiredFields[key]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
      missingFields: missingFields,
    });
  }

  try {
    const newUser = await usersModel.addNewUser(requiredFields);
    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client: newUser,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists"
      });
    }
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const userData = { id, ...req.body };

  try {
    const result = await usersModel.updateUser(userData);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      client: result
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await usersModel.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      client: id,
    });
  } catch (error) {
    handleErrorResponse(res, error)
  }
};

module.exports = {
  getAllUsers,
  getAllUsersByID,
  addNewUser,
  updateUser,
  deleteUser,
};
