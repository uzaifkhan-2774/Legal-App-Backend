import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";


const UserSchema = new mongoose.Schema({
       
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 15,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        minLength : 4,
        maxLength : 20,
        unique : true,
        lowerCase : true,
    },
    password : {
        type : String,
        required : true,

    },
    phone : {
        type : String,
        required : true,
        minLength : 10,
        maxLength : 10,

    }, 
    role : {
        type : String,
        enum : ["Admin", "Client", "Lawyer"]
   },
   isActive : {
    type : Boolean,
    default : true
   }

},{timestamps : true});


// Logic for encrypt the password at the time of registration 

UserSchema.pre('save', async function(){

    // if we are not updating the password , there is no need to hash password.
 try {
    
    if(!this.isModified('password')){
        return;
    }

    const salt = await genSalt(10);

    this.password = await bcrypt.hash(this.password, salt)

 } catch (error) {

    console.log(error);
 }
 


})

 const  User = mongoose.model("User", UserSchema);

 export default User;