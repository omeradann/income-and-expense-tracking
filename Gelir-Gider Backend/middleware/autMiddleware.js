const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const createError = require('http-errors');



const auth =  async(req,res,next) => {
    try {
        const authToken = req.headers["authorization"]
      
        if (!authToken) {                                     
          next(createError(400, 'invalid'))
        } else {
         jwt.verify(authToken, 'secretkey' , (err, payload) => {
            if (err) {
              next(createError(400, "token error"));
            }
            req.payload = payload;
            next();
    
         })}
      
       
      
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = auth;