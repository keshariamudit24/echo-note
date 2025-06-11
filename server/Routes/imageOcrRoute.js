const express = require('express');
const expressAsyncHandler = require('express-async-handler')
const UserModel = require('../schemas/userSchema')
const imgOcr = express.Router();
const axios = require('axios')

async function sendImageToOCRSpace(base64Str) {
  const apiKey = 'K84162663888957'; // replace with your OCR.space API key
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
    return response.data;

  } catch (error) {
    console.error('OCR API call failed:', error.response?.data || error.message);
    throw error;
  }
}

imgOcr.post('/ocr', expressAsyncHandler(async (req, res) => {
    // take the input
    const { image, title, time, userEmail, sessionId } = req.body;
    // find the user having this userEmail
    const currUser = await UserModel.findOne({ email: userEmail });

    // perform OCR
    const ocrData = sendImageToOCRSpace(image);

    // store the summary in the database 
    const targetSession = currUser.session.id(sessionId);

    if (!targetSession) {
        return res.status(404).send({ msg: 'Session not found' });
    }

    targetSession.summary = ocrData.ParsedResults[0].ParsedText;

    // Save the changes
    await currUser.save();

    res.status(200).send({ msg: "Summary added to session", sessionId });
}))

module.exports = imgOcr;