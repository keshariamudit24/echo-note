const express = require('express');
const userRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../schemas/userSchema')

userRoute.get("/summary", expressAsyncHandler(async (req, res) => {
    res.send({ msg: "hello" });
}))

module.exports = userRoute