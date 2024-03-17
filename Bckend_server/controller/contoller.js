const userModel = require('../model/userSchema');
const bcrypt = require("bcryptjs")
const emailValidator = require('email-validator');
const JWT = require("jsonwebtoken")
const e = require("express")


const signup = async (req, res, next )=>{

    const { name, username, bio, email, password } = req.body;
    console.log(name, username, bio, email, password);

    if(!name || !username || !bio  || !email || !password ){
        return res.status(400).json({
            success: false,
            error: "ALL filed must be Require For register User..!" 
        })
    }

    const validEmail = emailValidator.validate(email);

        if(!validEmail){
            return res.status(400).json({
                success: false,
                error: "Plzz Correct your Email..!"
            })
        }

    try {
        const UserInfo = userModel(req.body);
        const result = await UserInfo.save();
    
        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        if(error.code === 11000 ){
            res.status(400).json({
                success: false,
                error: "Account is already Exist...!"
            });  
        }

        res.status(400).json({
            success: false,
            error: error.message
        });
    }

}

const login = async(req, res)=>{
	const { username, password} =  req.body;

	if(!username || !password){
		res.status(400).json({
			success: false,
			error: "every Feild IS Mendetory...!"
		});
	}

	try {
		const user = await userModel 
	.findOne({
		username
	})
	.select('+password')

	if(!user ||!(await bcrypt.compare(password , user.password))){
		return res.status(400).json({
			success: false,
			error: "Invaild Crendentails"
		});
	}

	const token = user.jwtToken();
	user.password = undefined

	const cookieOption = {
		maxAge: 24 * 60 * 60 * 1000, 
		httpOnly: true
	}

	res.cookie("token", token, cookieOption);
	res.status(200).json({
		success: true,
		data: user
	});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

const getuser = async (req, res, next)=>{
	const UserID = req.user.id;

	try {
		const user = await userModel.findById(UserID)
		return res.status(200).json({
			success: true,
			data: user
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		})	
	}
}

module.exports = {
    signup,
    login,
    getuser

}