const { handleErrorResponse } = require("../../public/javascript/handleErrorResponse");
const specialtiesModel = require("../model/specialties.model");

const getAllSpecialties = async (req, res) => {
  try {
    const specialties = await specialtiesModel.getAllSpecialties();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      results: specialties,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = {
  getAllSpecialties
}