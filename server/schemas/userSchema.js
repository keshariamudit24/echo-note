const mongoose = require('mongoose');

// define the Schemas

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    session: [
        {
            title: String,
            finalSummary: Boolean,
            date: {
                type: Date,
                default: Date.now
            },
            summary: String
        }
    ]
}, { 
    timestamps: true 
});

userSchema.statics.createFromClerk = async function(clerkUser) {
    return this.findOneAndUpdate(
        { email: clerkUser.email },
        {
            email: clerkUser.email,
            firstName: clerkUser.firstName,
        },
        { upsert: true, new: true }
    );
};

// create models
const UserModel = mongoose.model("user", userSchema);

// export 
module.exports = UserModel
