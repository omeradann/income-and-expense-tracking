const hataBul = (err, req, res, next) => {

    res.json({
        mesaj: err.message,
        hataKodu: err.statusCode || 400
    })
}


module.exports = hataBul;