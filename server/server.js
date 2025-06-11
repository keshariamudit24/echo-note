const express = require("express")
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./Routes/userRoute');
const extRoute = require("./Routes/extensionRoute");
const authRoute = require('./Routes/authRoute')
const imgOcr = require('./Routes/imageOcrRoute')
const requireAuth = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
<<<<<<< HEAD
  origin: ['http://localhost:5173', 'chrome-extension://hfdkkflnkbflkdfanmngjkjiadiihhed'],
=======
  origin: ['http://localhost:5173', 'chrome-extension://fcanbnopnhklpjfhpmpgmgpkigdnbleh'],
>>>>>>> 52cf56d75c4bbc54bbec3c295dd3911dfb1fbb1b
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.use('/user', requireAuth, userRoute)
app.use('/extension', extRoute)
app.use('/auth', authRoute)
app.use('/screenshot', imgOcr)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(PORT, () => { console.log(`listening on port: ${PORT}...`) }))
    .catch()

