const logger = (req, res, next) => {
  try {
    console.log(`${req.method} ${req.url}`);
    next();
  } catch (err) {
    console.error("Error in logger middleware:", err);
    res.status(500).json({
      success: false,
      message: "Error in request logging",
      error: err.message,
    });
  }
};

export default logger;
