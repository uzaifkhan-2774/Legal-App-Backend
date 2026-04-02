import mongoose from "mongoose";

const LawyerProfileSchema = new mongoose.Schema({
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    BarCounsileId : {
        type : String,
        required : true
    },
    Degree : {
        type : String,
        required : true,
    },
    LawyerType : {
        type : String,
        enum : ["Criminal", "Civil", "Domestic", "Divorse", "Corporate", "Cyber", "Property"],
        required : true
      },
    TotalCases : {
        type : Number,
    },
    WinCases : {
        type : Number,
    },
    LostCases : {
        type : Number,
    },
    WinRatio : {
        type : Number,
    },
    Minfee : {
        type : Number,
    },
    Maxfee : {
        type : Number,
    },
    Status : {
        type : String,
        enum : ["PENDING", "APPROVED", "REJECTED", "BLOCKED"],
        default : "PENDING",
    },
    AdminRemark : {
        type : String,
    },

   ApprovedAt : {
    type : Date,
   }
},{timestamps : true});



 const LawyerProfile = mongoose.model("LawyerProfile", LawyerProfileSchema);

 export default LawyerProfile;