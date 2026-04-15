import User from "../models/User.js";
import LawyerProfile from "../models/LawyerProfile.js";
import Mailsender from "../utiles/generateNodemailer.js";


 export  const getallLawyer = async (req, res)=>{

     try {
      let FetchAllLawyers = await LawyerProfile.find().populate({      // we are populating 
        path :'UserId',
        select : '-password -__v'
      }).select('-__v');

      // console.log(FetchAllLawyers);

      res.status(200).json({
          message : "All Lawyer Fetched successfully.",
          result : FetchAllLawyers
      })
  
     } catch(error){
      res.status(500).json({ message: `${error} server error...` });
     }
}

// API for changing the status of lawyerprofile


export const UpdateLawyerStatus = async (req, res)=>{

  const profileId = req.params.id;
      // console.log(profileId);


 let {Status, AdminRemark} = req.body;


 try{


   if(!profileId){
    return res.status(400).json({
      message : "please provide profile id."
    })
   }

  let confirmLawyer = await LawyerProfile.findById(profileId); // finding the lawyer within lawyerprofile model by using profile id i.e Id 

let user  = await User.findById(confirmLawyer.UserId)

   

    if(! confirmLawyer){

      return res.status(400).json({
        message : "lawyer is not exist in Lawyer profile"
      })
    }

    if(!Status || !AdminRemark){

     return res.status(400).json({
        message : "all fields are required.",
        success : false
      })
    
   }
    
   confirmLawyer.Status = Status;
   confirmLawyer.AdminRemark = AdminRemark;

   

   if(confirmLawyer.Status === "APPROVED"){
       confirmLawyer.ApprovedAt = new Date ();
   }else{
    null
   }

     await confirmLawyer.save();    // save is the function of mongoose which save the changes in the mongodb collections's document 
     
     //setting the mailSender options for sending email.
     const to = user.email;
     const subject = `Your Status is ${Status}`;
     const text =   `congratulations your status is ${Status} now, thank you`;
     const htmlTemplate =      
`
</html>
<head>
  <meta charset="UTF-8">
  <title>Request ${Status}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">

        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px;">
          
          <tr>
            <td align="center" style="font-size:22px; font-weight:bold; color:#333;">
              Request Status Update
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px; font-size:16px; color:#333;">
              Hello <strong>${user.name}</strong>,
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 0;">
              <span style="
                font-size:18px;
                font-weight:bold;
                color:#ffffff;
                background-color:#16a34a;
                padding:10px 20px;
                display:inline-block;
              ">
                ${Status}
              </span>
            </td>
          </tr>

          <tr>
            <td align="center" style="font-size:15px; color:#555;">
              Your request has been successfully ${Status} now, Thank You.
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:30px; font-size:12px; color:#999;">
              Thank you for showing intrest in our service.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
   
 //so we are sending the email from here to the user.
     await Mailsender(to, subject, text, htmlTemplate);

     res.status(200).json({
      message : `lawyer status has changed successfully, status updated to ${Status}`,
      result : confirmLawyer,
      success : true
     })
   

 } catch (error){
  res.status(500).json({
    message : `${error} server error.`,
    success : false
  })
 }

   




}
