const errorhandler = (err, req, res, next) => {
    console.log("Error:", err);

    res.status(500).json({
        success: false,
        message: err.message || "Server error"
    });
};

module.exports = errorhandler;