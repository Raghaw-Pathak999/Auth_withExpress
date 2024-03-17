const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
	name:{
		type:String,
		required:[true, "NAME IS REQUIRE FOR REGISTATIONS"]
	},
	email : {
		type:String,
		required:[true, "EAMIL IS REQUIRE FOR REGISTATIONS"],
		unique: [true, "ALREADY EXITS THIS EMAIL....! "]
	},
	password : {
		type:String,
		required:[true, "PASSWORD IS REQUIRE FOR REGISTATIONS"],
		select:false
	},
	bio : {
		type:String,
		required:[true, "BIO IS REQUIRE FOR UNDERSTAND YOU"]
	},
	username : {
		type:String,
	   required:[true, "USER-NAME IS REQUIRE FOR REGISTATIONS"]
	}
	
},{
	timestamps: true
});

userSchema.pre('save', async function (next) {
	if(!this.isModified('password')){
		return next()
	}
	this.password = await bcrypt.hash(this.password, 10);
	next()
})


userSchema.methods = {
	jwtToken(){
		return JWT.sign({id: this._id, username: this.username},
			process.env.SECRET,
			{expiresIn:'24h'})
	}
}

const userModel = mongoose.model('INFO_user', userSchema)

module.exports = userModel;