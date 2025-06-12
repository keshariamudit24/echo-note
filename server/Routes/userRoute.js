const express = require('express');
const userRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../schemas/userSchema')
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

// Get all sessions for a user
userRoute.get("/sessions/:email", expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    console.log(email)
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ sessions: user.session });
    } catch (error) {
        res.status(500).json({ message: "Error fetching sessions" });
    }
}));

// Get specific session summary
userRoute.get("/session/:email/:sessionId", expressAsyncHandler(async (req, res) => {
    const { email, sessionId } = req.params;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const session = user.session.id(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.json({ session });
    } catch (error) {
        res.status(500).json({ message: "Error fetching session" });
    }
}));

// Generate final summary for a session
userRoute.post("/generate-summary/:sessionId", expressAsyncHandler(async (req, res) => {
    const { sessionId } = req.params;
    const { email } = req.body;
    
    try {
        const user = await UserModel.findOne({ email });
        const session = user.session.id(sessionId);
        
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // bool check 
        if(!session.finalSummary){
            // API call
            const targetSummary = session.summary
            const finalSummaryLLM = await getGeminiSummary(targetSummary);

            console.log("FINAL SUMMARY : \n", finalSummaryLLM)

            session.summary = finalSummaryLLM

            session.finalSummary = true;
            await user.save();
        }
        
        res.json({ summary: session.summary });
    } catch (error) {
        res.status(500).json({ message: "Error generating summary" });
    }
}));

module.exports = userRoute;