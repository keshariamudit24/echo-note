const express = require('express');
const extRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const ScreenshotSchema = require('../schemas/userSchema')

extRoute.post('/api/screenshot', expressAsyncHandler(async (req, res) => {
  const { image, timestamp, userId } = req.body;

  await ScreenshotSchema.create({
    userId,
    timestamp,
    image
  });

  res.status(200).json({ message: "Screenshot saved" });
}));

module.exports = extRoute