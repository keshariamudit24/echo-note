const express = require('express');
const userRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');

userRoute.get("/", expressAsyncHandler(async (req, res) => {
    res.send({ msg: "hello" });
}))

module.exports = userRoute