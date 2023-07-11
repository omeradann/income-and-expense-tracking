const findError = (err, req, res, next) => {

    res.json({
        message: err.message,
        errorCode: err.statusCode || 400
    })
}


module.exports = findError;