const express = require('express');
const extRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const  UserModel  = require('../schemas/userSchema');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

async function getGeminiSummary(text) {
      // For text-only input, use the gemini-pro model
  console.log("requesting gemini");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `The input text below contains many rewritten sentences and redundant information. Go through it carefully and generate a concise and clear summary, removing all repetitions and redundancies. Focus only on the essential points and present them once in a well-structured format i.e Headings, side-headings, paragraphs, bullet points, conclusion. Here's the text:  \n\n${text}`;

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


// POST: Create session for user
extRoute.post('/api/session-id', expressAsyncHandler(async (req, res) => {
  try {
    const { userEmail, title } = req.body;

    console.log("user email : ", userEmail)
    console.log("title : ", title)

    if (!userEmail || !title) {
      return res.status(400).send({ msg: "Missing userEmail or title" });
    }

    const currUser = await UserModel.findOne({ email: userEmail });
    if (!currUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Push session data into session array
    const sessionObj = {
      title,
      finalSummary: false,
      date: new Date()
    };

    currUser.session.push(sessionObj);
    await currUser.save();

    const newSession = currUser.session[currUser.session.length - 1];

    res.status(201).send({
      msg: "Session created",
      payload: { sessionId: newSession._id }
    });
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).send({ msg: "Internal server error", error: error.message });
  }
}));

extRoute.post('/summary/final', expressAsyncHandler(async (req, res) => {

    const { userEmail, sessionId } = req.body;

    console.log("email : ", userEmail)
    console.log("session id : ", sessionId)

    if (!userEmail || !sessionId) {
      return res.status(400).send({ msg: "Missing userEmail or sessionId" });
    }

    const currUser = await UserModel.findOne({ email: userEmail });
    if (!currUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    console.log("current user : ", currUser)

    const targetSession = currUser.session.id(sessionId);
    if (!targetSession) {
      return res.status(404).send({ msg: "Session not found" });
    }

    const targetSummary = targetSession.summary

    // ask gemini to give the summary and remove the redundancy 
    const finalSummary = await getGeminiSummary(targetSummary);

    console.log("final gemini summary : ", finalSummary);

    //update it in the database 
    targetSession.summary = finalSummary
    await currUser.save();

    res.status(200).send({ 
      msg: "final summary without any redundancy",
      session: targetSession.summary
    });
}))


module.exports = extRoute