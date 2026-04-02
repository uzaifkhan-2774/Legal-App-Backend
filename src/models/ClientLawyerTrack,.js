import mongoose from "mongoose";

const ClientLawyerTrackSchema = new mongoose.Schema({
    caseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ClientCase",
    },
    LawyerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    ClientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    requestStatus : {
        type  : String,
        enum : ["PENDING ", "ACCEPTED", "REJECTED"],
        default : "PENDING",
    },
    LawyerResponse : {
        type  : String,
    },
},{timestamps : true});


export default ClientLawyerTrack = mongoose.model("ClientLawyerTrack", ClientLawyerTrackSchema);