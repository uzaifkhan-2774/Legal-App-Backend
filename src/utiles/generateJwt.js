import jwt from "jsonwebtoken";


const token =  (userID, name)=> {

 
   //we are using using the userid and name of the user and setting the secret key for generating the jwt token 
     
     return  jwt.sign({userID, name}, process.env.JWT_KEY, {expiresIn : '7d'});
      

     

}



export default token;