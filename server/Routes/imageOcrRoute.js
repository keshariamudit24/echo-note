const express = require('express');
const expressAsyncHandler = require('express-async-handler')
const UserModel = require('../schemas/userSchema')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const imgOcr = express.Router();
const axios = require('axios')
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// Function to get summary from Gemini
async function getGeminiSummary(text) {
  // For text-only input, use the gemini-pro model
  console.log("requesting gemini");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `This is a project for visually impaired people for them to use during online sessions to avoid strain on their eyes. The following is raw text extracted using OCR from a classroom whiteboard/notes/document. It may contain irrelevant characters or small OCR errors. Please summarize the key ideas clearly and in detail. Focus on the main points, definitions, formulas, or steps. Ignore random symbols or formatting issues. Here's the text:  \n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("gemini summary received");
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini summary:", error);
    throw error;
  }
}

async function sendImageToOCRSpace(base64Str) {
  console.log("In ocr func");
  const apiKey = process.env.API_KEY; // replace with your OCR.space API key
  console.log("API KEY: ", apiKey);
  const base64ImageWithPrefix = `data:image/png;base64,${base64Str}`;

  const data = new URLSearchParams();
  data.append('base64Image', base64ImageWithPrefix);
  data.append('language', 'eng');           // specify language as needed
  data.append('isOverlayRequired', 'false'); // optional params
  data.append('OCREngine', '2');             // use engine 2 for auto language detection
  // add more params as needed

  try {
    const response = await axios.post('https://api.ocr.space/parse/image', data.toString(), {
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // OCR result JSON:
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('OCR API call failed:', error.response?.data || error.message);
    throw error;
  }
}

imgOcr.post('/ocr', expressAsyncHandler(async (req, res) => {
    // take the input
    console.log("request received");
    const { image, userEmail, sessionId } = req.body;
    // console.log("Request body: ", req.body);

    console.log("Session Id: ",sessionId)

    
    // find the user having this userEmail
    const currUser = await UserModel.findOne({ email: userEmail });

    const targetSession = currUser.session.id(sessionId);
    if (!targetSession) {
        return res.status(404).send({ msg: 'Session not found' });
    }

    // perform OCR
    console.log("OCR start");
    const ocrData = await sendImageToOCRSpace(image);
    const extractedText = ocrData.ParsedResults[0].ParsedText;
    console.log("OCR end");
    console.log(extractedText);

    // Get Gemini summary
    // console.log("gpt start");
    // const summary = await getGeminiSummary(extractedText);
    // console.log("gpt end");
    // console.log("Summary: ",summary);


    // store the summary in the database 
    
    // console.log(ocrData);
    targetSession.summary += extractedText;

    // Save the changes
    await currUser.save();
    res.status(200).send({ msg: "Summary added to session", sessionId });
}))

module.exports = imgOcr;