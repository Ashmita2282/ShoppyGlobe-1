const validateUser = (req, res, next) => {
  try {
    const { firstName, lastName, hobby } = req.body;

    if (!firstName || !lastName || !hobby) {
      return res
        .status(400)
        .json({
          error: "All fields (firstName, lastName, hobby) are required",
        });
    }

    next();
  } catch (err) {
    console.error("Error in validation middleware:", err);
    res.status(500).json({
      success: false,
      message: "Error in validation",
      error: err.message,
    });
  }
};

export default validateUser;
