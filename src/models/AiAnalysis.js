import mongoose from "mongoose";

const AiAnalysisSchema = new mongoose.Schema(
  {
    ClientCaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientCase",
    },
    PredictedCaseType: {
      type: String,
    },
    CaseSeverity: {
      type: String,
      enum: ["LOW", "HIGH", "MEDIUM"],
      default: "LOW",
    },
    SuggestedIPSections: [String],
    WorstCaseOutCome: {
      type: String,
    },
    EstimatedMinFee: {
      type: Number,
    },
    EstimatedMaxFee: {
      type: Number,
    },
    SuggestedLawyer: [
      {
        LawyerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        Score: {
          type: Number,
        },
      },
    ],
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);



const AiAnalysis = mongoose.model("AiAnalysis", AiAnalysisSchema);

export default AiAnalysis;