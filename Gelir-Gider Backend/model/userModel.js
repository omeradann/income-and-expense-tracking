const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Joi = require('joi');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    email:{ 
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        trim: true,
        required: true
        
    }
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // }
}, {collection: "users", timestamps: true});

//joi
userSchema.methods.joiValidation = function (userObject) {
     const schema = Joi.object({
     email: Joi.string().trim().email(),
     password: Joi.string().trim()
 });
 
    return schema.validate(userObject);

};


 

userSchema.methods.toJSON=function() {
    const user = this.toObject();
    delete user.createdAt;
    delete user.updatedAt;
    delete user.sifre;
    delete user.__v;

    return user
};


userSchema.methods.generateToken = async function() {
    const loggedInUser = this;
    const token = await jwt.sign({_id: loggedInUser._id} , 'secretkey', {expiresIn: '1h'});
    const refreshToken = await jwt.sign({_id: loggedInUser._id} , 'secretkey', {expiresIn: '90d'});
    return {token,refreshToken};
};

userSchema.statics.signIn = async (email, password) => {
     const {error, value} = schema.validate({email, password});
    
    const user = await User.findOne({ email });

    if (!user) {
        throw createError(400, "User not found!")
    }

    const passwordCheck= await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
        throw createError(400, "User not found!")
    }

    return user;


}


const User = mongoose.model('User', userSchema)

module.exports = User;