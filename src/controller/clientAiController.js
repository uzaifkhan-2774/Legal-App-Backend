import { GoogleGenAI } from "@google/genai";
import LawyerProfile from "../models/LawyerProfile.js";
import AiAnalysis from "../models/AiAnalysis.js";

export const AiResponse = async (req, res) => {
  let { prompt } = req.body;
  console.log(prompt); // we are taking prompt form the client and putting it to ai model

  try {
    const ai = new GoogleGenAI({
      apiKey: "AIzaSyC892lnhpZIwW8kMTiO4aSe5knVuNCFJw4",
    });

    const response = await ai.models.generateContent({
      // generating ai response by npm google genAi.
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "please return the data in the json formate",
      },
    });

    console.log(response.text);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({
      message: `${error} server error`,
    });
  }
};

export const CaseCreate = async (req, res) => {
  const { problemStatement, Location, caseDate } = req.body;

  try {
    if (!problemStatement || !Location || !caseDate) {
      return res.status(400).json({
        message: "please fill all the field",
        success: false,
      });
    }

    if (problemStatement.trim() === "") {
      return res.status(400).json({
        message: "please provide problem statement",
        success: false,
      });
    }

    const ai = new GoogleGenAI({
      apiKey: "AIzaSyC892lnhpZIwW8kMTiO4aSe5knVuNCFJw4",
    });

    const prompt = `
          Analyze the legal case belowand return STRICT JSON only. please provide the response on in JSON formate.
          
          Problem: "${problemStatement}",
          
          Return format:
          {
          "PredictedCaseType":"",
          "CaseSeverity":"HIGH" | "MEDIUM" | "LOW",
          "SuggestedIPSections": [],
          "WorstCaseOutCome":"",
          "EstimatedMinFee": number,
          "EstimatedMaxFee": number,
          "remark":"",
          "TypeOfLawyerNeeded":"Criminal" | "Civil" | "Family" | "Corporate" | "Cyber" | "Property"
          }
          `;

    const response = await ai.models.generateContent({
      // generating ai response by npm google genAi.
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
      config: {
        systemInstruction:
          "please return the data in the JSON formate, No extra text, No headers, only JSON formate.",
      },
    });

    // console.log(response.candidates[0].content.parts[0]);

    const resultData = response.candidates[0]?.content.parts[0].text;
    const parsedResultData = JSON.parse(resultData);
    // console.log(parsedResultData);

    const lawyersData = await LawyerProfile.find({
      LawyerType : parsedResultData?.TypeOfLawyerNeeded,
      Status : "APPROVED",
      Maxfee : {$lte: parsedResultData?.EstimatedMaxFee},
      Minfee : {$gte : parsedResultData?.EstimatedMinFee}

    })
    
    console.log(lawyersData);
      

    res.status(200).json({
      message: "data fetched successfully",
      success: true,
      result: parsedResultData
    });


  } catch (error) {
    res.status(500).json({
      message: `${error} server error`,
    });
  }
};
