const express = require('express');
const expressAsyncHandler = require('express-async-handler')
const {UserModel} = require('../schemas/userSchema')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const imgOcr = express.Router();
const axios = require('axios')
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// Function to get summary from Gemini
async function getGeminiSummary(text) {
  // For text-only input, use the gemini-pro model
<<<<<<< HEAD
  console.log("requesting gemini");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `This is a project for visually impaired people for them to use during online sessions to avoid strain on their eyes. The following is raw text extracted using OCR from a classroom whiteboard/notes/document. It may contain irrelevant characters or small OCR errors. Please summarize the key ideas clearly and in detail. Focus on the main points, definitions, formulas, or steps. Ignore random symbols or formatting issues. Here's the text:  \n\n${text}`;
=======
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `This is a project for visually impaired people for them to use during online sessions to avoid strain on their eyes. The following is raw text extracted using OCR from a classroom whiteboard/notes/document. It may contain irrelevant characters or small OCR errors. Please summarize the key ideas clearly and concisely. Focus on the main points, definitions, formulas, or steps. Ignore random symbols or formatting issues. Here's the text:  \n\n${text}`;
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
<<<<<<< HEAD
    console.log("gemini summary received");
=======
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini summary:", error);
    throw error;
  }
}

async function sendImageToOCRSpace(base64Str) {
<<<<<<< HEAD
  console.log("In ocr func");
  const apiKey = process.env.API_KEY; // replace with your OCR.space API key
  console.log("API KEY: ", apiKey);
=======
  // console.log(base64Str);
  const apiKey = process.env.API_KEY; // replace with your OCR.space API key
  // console.log("API KEY: ", apiKey);
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b
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
<<<<<<< HEAD
    console.log(response.data);
=======
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b
    return response.data;

  } catch (error) {
    console.error('OCR API call failed:', error.response?.data || error.message);
    throw error;
  }
}

imgOcr.post('/ocr', expressAsyncHandler(async (req, res) => {
    // take the input
<<<<<<< HEAD
    console.log("request received");
    const { image, userEmail, sessionId } = req.body;
    console.log("Request body: ", req.body);

    console.log("Session Id: ",sessionId)
=======
    const { image, userEmail, sessionId } = req.body;
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b
    // find the user having this userEmail
    const currUser = await UserModel.findOne({ email: userEmail });

    // perform OCR
<<<<<<< HEAD
    console.log("OCR start");
    const ocrData = await sendImageToOCRSpace(image);
    const extractedText = ocrData.ParsedResults[0].ParsedText;
    console.log("OCR end");
    console.log(extractedText);

    // Get Gemini summary
    console.log("gpt start");
    const summary = await getGeminiSummary(extractedText);
    console.log("gpt end");
    console.log("Summary: ",summary);

=======
    const ocrData = await sendImageToOCRSpace(image);
    const extractedText = ocrData.ParsedResults[0].ParsedText;

    // Get Gemini summary
    const summary = await getGeminiSummary(extractedText);
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b

    // store the summary in the database 
    const targetSession = currUser.session.id(sessionId);
    if (!targetSession) {
        return res.status(404).send({ msg: 'Session not found' });
    }
    
<<<<<<< HEAD
    // console.log(ocrData);
    targetSession.summary += summary
=======
    console.log(ocrData);
    targetSession.summary = summary
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b

    // Save the changes
    await currUser.save();
    res.status(200).send({ msg: "Summary added to session", sessionId });
}))

module.exports = imgOcr;