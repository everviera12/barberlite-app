const handleErrorResponse = (res, error) => {
  if (error.code === "22P02") {
    return res.status(400).json({ success: false, message: "Client ID not valid" });
  }

  console.error("Error:", error);
  res.status(500).json({ success: false, message: "Internal server error" });
};

module.exports = { handleErrorResponse }