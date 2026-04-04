import mongoose from "mongoose";

const ClientCaseShema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    problemStatement: {
      type: String,
      minLength: 60,
      required: true
  },

    Location: {
      type: String,
      required: true,
    },
    caseDate: {
      type: String,
      required: true,
    },
    proofFile: [
      {
        fileName: {
          type: String
          
        },
        fileUrl: {
          type: String
      
        }
      }
    ],

    RequestedLawyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }, 
    AssignedLawyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    OpponentLawyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",  
    },
    caseStatus : {
        type : String,
        enum : ["NEW", "ONGOING", "SOLVED"],
        default : "NEW"
    },
  },
  { timestamps: true }
);


const ClientCase = mongoose.model("ClientCase", ClientCaseShema);

export default ClientCase;