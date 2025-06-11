const express = require("express")
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
const userRoute = require('./Routes/userRoute')

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(PORT, () => { console.log(`listening on port: ${PORT}...`) }))
    .catch()

app.use("/user", userRoute);
    


