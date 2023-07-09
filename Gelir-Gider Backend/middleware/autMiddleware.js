const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const createError = require('http-errors');



const auth =  async(req,res,next) => {
    try {
        const authToken = req.headers["authorization"]
        //?.split(' ')[1]; jwt.verify işlevinize Bearer *************... gibi bir belirteç aktarıyorsanız, bunu yaparak jwt'ye aktarmadan önce belirteci böldüğünüzden emin olun
        if (!authToken) {                                           //İsteğe bağlı zincirleme operatörü ?. data değişkeni undefined veya null değerine eşit değilse split() yöntemini çağırır, aksi halde undefined değerini döndürür ve hiçbir hata atılmaz.
          next(createError(400, 'invalid'))
        } else {
         jwt.verify(authToken, 'secretkey' , (err, payload) => {
            if (err) {
              next(createError(400, "token hatalı"));
            }
            req.payload = payload;
            next();
    
         })}
      
        // req.user =await User.findById({_id: sonuc._id})
        // req.user = sonuc
      
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = auth;