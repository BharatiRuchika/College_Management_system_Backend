const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName:{
      type:String,
      required:[true,'please enter first name']
    },
    lastName:{
        type:String,
        required:[true,'please enter last name']
    },
    phoneNo:{
        type:String,
        required:[true,'please enter phone number']
   },
   dateOfBirth:{
     type:Date,
     required:[true,'please enter date of birth']
   },
    gender:{
       type:String,
       required:true
    },
    lastQualification:{
      type:String,
      required:true
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    registrationDate:{
       type:Date,
       default:Date.now
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})



userSchema.methods.getJwtToken = async function(){
    console.log("im in token");
    console.log("token",jwt.sign({ id: this._id }, "GUvi!jdks", {
        expiresIn: "7d"
    }))
    return jwt.sign({ id: this._id }, "GUvi!jdks", {
        expiresIn: "7d"
    });
}


module.exports = mongoose.model('user',userSchema)