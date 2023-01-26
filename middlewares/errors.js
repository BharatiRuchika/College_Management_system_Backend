module.exports = (err, req, res, next) => {
    console.log("im in error handler");
    console.log("statusCode",err.statusCode);
    err.statusCode = err.statusCode || 500;
        console.log(err);
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }