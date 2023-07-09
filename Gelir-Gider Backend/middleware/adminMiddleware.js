
const admin = (req,res,next) => {
    
    
        if (!req.payload.isAdmin) {
            return res.status(403).json({
               mesaj: "admin değilsiniz"
            })
        }
         next();
 
    }
        


// module.exports = admin;