const findError = (err, req, res, next) => {

    res.json({
        mesaj: err.message,
        hataKodu: err.statusCode || 400
    })
}


module.exports = findError;