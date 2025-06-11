const express = require('express');
const extRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const userSchema = require('../schemas/userSchema');
const { users } = require('@clerk/clerk-sdk-node');


extRoute.get('/api/session-id', expressAsyncHandler(async (req, res) => {
  const { userEmail, title } = req.body;
  // create a new session for this user 
  // -> find the user using the emailId
  const currUser = await userSchema.findOne({ email: userEmail});
  // -> create a new session
  await currUser.session.push({
    title,
    date: Date.now(),
  })
  await currUser.save()

  // return the sessionId
  const newSession = currUser.session[currUser.session.length - 1]; // ✅ get last session

  res.status(201).send({
    msg: "session created",
    payload: { sessionId: newSession._id }
  });
}));

module.exports = extRoute