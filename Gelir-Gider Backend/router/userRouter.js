const router = require('express').Router();
var createError = require('http-errors');
const userController = require('../controllers/userController');
const User = require('../model/userModel');


//auth middleware
const autMiddleware = require('../middleware/autMiddleware');
//admin middleware
// const adminMiddleware = require('../middleware/adminMiddleware');





router.get('/', autMiddleware, userController.listUser)

router.get('/me' , autMiddleware, async (req,res,next) => {
    try {
		if (req.payload) {

			const user = await User.findById(req.payload._id);
			
			res.send(user);
		}

	} catch (e) {
		console.log(e);
		res.json("error" + e);
	}
});

router.post("/refresh_token" ,async (req,res,next) => {
	try {
		const authorizationToken = req.body.refresh_token;
		const result = jwt.verify(authorizationToken, "secretkey")
		
		const user = await User.findById(result._id);
		 const {token,refreshToken} = await user.generateToken();
		 res.json({user,token,refreshToken});
	} catch (e) {
		console.log(e);
	}
})


router.post('/' , userController.addUser)
router.delete('/deleteAll' , autMiddleware , userController.deleteUser)
router.post('/login' , userController.userLogin)
router.post('/logout' , userController.userLogout)


module.exports = router;