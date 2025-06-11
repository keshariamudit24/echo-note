const express = require('express');
const extRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { UserModel } = require('../schemas/userSchema');


// POST: Create session for user
extRoute.post('/api/session-id', expressAsyncHandler(async (req, res) => {
  const { userEmail, title } = req.body;

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
    date: new Date()
  };

  currUser.session.push(sessionObj);
  await currUser.save();

  const newSession = currUser.session[currUser.session.length - 1];

  res.status(201).send({
    msg: "Session created",
    payload: { sessionId: newSession._id }
  });
}));


module.exports = extRoute