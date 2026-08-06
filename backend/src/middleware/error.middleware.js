const ApiResponse = require("../utils/ApiResponse");

module.exports = (err, req, res, next) => {

    console.error(err);
    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    });
};