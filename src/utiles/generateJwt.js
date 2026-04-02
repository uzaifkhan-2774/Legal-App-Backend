import jwt from "jsonwebtoken";


const token =  (userID, name)=> {

 
 
     
     return  jwt.sign({userID, name}, 'this is the legal app', {expiresIn : '7d'});
      

     

}



export default token;