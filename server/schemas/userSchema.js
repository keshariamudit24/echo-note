const mongoose = require('mongoose');

// define the Schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    session: [
        {
            title: String,
            date: {
                type: Date,
                default: Date.now
            },
            summary: String
        }
    ]
}, {strict: "throw"});

// create a model
const UserModel = mongoose.model("user", userSchema);

// export it 
module.exports = UserModel; 