const {
  handleErrorResponse,
} = require("../../public/javascript/handleErrorResponse");
const specialtiesModel = require("../model/specialties.model");

const getAllSpecialties = async (req, res) => {
  try {
    const specialties = await specialtiesModel.getAllSpecialties();
    res.status(200).json({
      success: true,
      message: "Specialties retrieved successfully",
      results: specialties,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const addNewSpecialty = async (req, res) => {
  const requiredFields = { specialties_name: req.body.specialties_name };

  const missingFields = Object.keys(requiredFields).filter(
    (key) => !requiredFields[key]
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
      missingFields: missingFields,
    });
  }

  try {
    const specialtyExists = await specialtiesModel.checkSpecialtyExists(
      requiredFields.specialties_name
    );

    if (specialtyExists) {
      return res.status(409).json({
        success: false,
        message: `Specialty ${specialtyExists.specialties_name.toUpperCase()} already exists`,
      });
    }

    const newSpecialty = await specialtiesModel.addNewSpecialty(requiredFields);
    res.status(201).json({
      success: true,
      message: "Specialty created successfully",
      specialty: newSpecialty,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateSpecialty = async (req, res) => {
  const id = parseInt(req.params.id);
  const specialties_name = req.body.specialties_name;

  if (!specialties_name) {
    return res.status(400).json({
      success: false,
      message: "Missing required field: specialties_name",
    });
  }

  try {
    const result = await specialtiesModel.updateSpecialty({
      id,
      specialties_name,
    });

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Specialty with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Specialty with ID ${id} updated successfully`,
      specialty: { id, specialties_name },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteSpecialty = async (req, res) => {
  const { id } = req.params;
  try {
    await specialtiesModel.deleteSpecialty(id);
    res.status(200).json({
      success: true,
      message: "Specialty deleted successfully",
      client: id,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = {
  getAllSpecialties,
  addNewSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
