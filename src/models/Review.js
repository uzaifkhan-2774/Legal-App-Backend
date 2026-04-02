import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    CaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientCase",
    },
    ClientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    LawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ReviewRating: {
      type: Number,
      MinRating: 1,
      maxRating: 5,
    },
    ReviewText: {
      type: String,
    },
  },
  { timestamps: true }
);


export default  Review = mongoose.model("Review", ReviewSchema);