import { GoogleGenAI } from "@google/genai";
import LawyerProfile from "../models/LawyerProfile.js";
import AiAnalysis from "../models/AiAnalysis.js";
import ClientCase from "../models/ClientCase.js";

// we are testing the ai model just, nothing else.
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
  const {  problemStatement, Location, caseDate } = req.body;





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
    const UserId = req.user;  // it is comming from middleware.
    // console.log(UserId);

 
    
    let proofFile = [];
     
    // console.log(req.files)  // we are expecting the array of files not a single file i.e req.files.
 
    if(req.files && req.files.length > 0){
      proofFile = req.files?.map(ele=>({
        fileName : ele.originalname,
        fileUrl : `my-uploads/${ele.fieldname}`
      }))
        
      }
      console.log("proofFiles" ,proofFile);   // here we are geeting the array for proofFile,

  


    const newCase = await ClientCase.create({    //creating client case with all the data.
      UserId : UserId,
      problemStatement : problemStatement,
      Location : Location,
      caseDate : caseDate,
      proofFile : proofFile
      })



  
      //giving prompt to the ai and taking the response from it.
    const ai = new GoogleGenAI({
      apiKey: "AIzaSyD2Zd8UUIAR34E7bzwOMbcCXG_V0nT4a9U",
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
    //  console.log(parsedResultData);

    // we are finding the lawyer based on the conditions ai given to us.and only returing the userId of the lawyer suggested by AI model.
    // aggregation pipeline.
   
    const lawyersData = await LawyerProfile.find({
      LawyerType : parsedResultData?.TypeOfLawyerNeeded,
      Status : "APPROVED",
      Maxfee : {$lte: parsedResultData?.EstimatedMaxFee},
      Minfee : {$gte : parsedResultData?.EstimatedMinFee}
    }).sort({WinCases : -1}).limit(5).select('UserId');
     
    
    // console.log(lawyersData);

    const mapData = lawyersData?.map(ele=> ele.UserId);   // Iterating the userId of every suggested lawyers

    // console.log(mapData);
      

    const newAiAnalysis = await AiAnalysis.create({
      ClientCaseId : newCase?._id,
      PredictedCaseType : parsedResultData?.PredictedCaseType,
      CaseSeverity : parsedResultData?.CaseSeverity,
      SuggestedIPSections : parsedResultData?.SuggestedIPSections,
      WorstCaseOutCome : parsedResultData?.WorstCaseOutCome,
      EstimatedMinFee : parsedResultData?.EstimatedMinFee,
      EstimatedMaxFee : parsedResultData?.EstimatedMaxFee,
      remark : parsedResultData?.remark,
      SuggestedLawyer : mapData
    })

    res.status(200).json({
      message: "data fetched successfully",
      success: true,
      result: parsedResultData, lawyersData, newCase
    });


  } catch (error) {
    res.status(500).json({
      message: `${error} server error`,
    });
  }
};
