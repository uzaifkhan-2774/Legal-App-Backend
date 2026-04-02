import LawyerProfile from "../models/LawyerProfile.js";
import User from "../models/User.js"

 


export const createLawyerProfile = async(req, res)=>{

    let {UserId, BarCounsileId, Degree, LawyerType, TotalCases, WinCases, LostCases, WinRatio, Minfee, Maxfee} = req.body;

    try{
    
        if(!UserId || !BarCounsileId || !Degree || !LawyerType ){

            res.status(400).json({
                message : "All Fields are required."
            })
        }

        let ExistingUser =   await User.findById(UserId);

        if(!ExistingUser){
            return res.status(400).json({
                message : "Please Complete Your Registration First"
            })
        }

        let UserRole = ExistingUser.role;
        if(UserRole !== "Lawyer"){

            return res.status(400).json({
                message : "Your Role is not Lawyer"
            })
        }

        let isMatch = await LawyerProfile.findOne({UserId : UserId});
         if(isMatch){
           return res.status(400).json({
                message : "Lawyer already have lawyer profile.",
                success  : false
            })
         }

         let NewLawyerProfile = await LawyerProfile.create({
            UserId,
            BarCounsileId,
            Degree,
            LawyerType,
            TotalCases,
            WinCases,
            WinRatio,
            Minfee,
            Maxfee
         })
         res.status(201).json({
            message :"Lawyer Profile Created Successfully.",
            result :  NewLawyerProfile,
            success: true
         })

        

    } catch(error){
        res.status(500).json({
            message : `${error} server error.`
        });
        
    }

}

