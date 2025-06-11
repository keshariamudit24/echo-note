const express = require('express');
const authRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { UserModel } = require('../schemas/userSchema');
const requireAuth = require('../middlewares/authMiddleware');

authRoute.get('/me', requireAuth, expressAsyncHandler(async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.auth.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}));

async function handleClerkSignin(clerkUser){
    try {
        const user = await UserModel.createFromClerk({
            email: clerkUser.email,
            firstName: clerkUser.firstName
        });
        return user;
    } catch (error) {
        console.error('Error creating/updating user:', error);
        throw error;
    }
}

// Route to handle Clerk webhook or frontend auth request
authRoute.post('/signin', expressAsyncHandler(async (req, res) => {
    const { email, firstName } = req.body;
    
    try {
        const user = await handleClerkSignin({ email, firstName });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create/update user' });
    }
}));

// Simplified signup endpoint
authRoute.post('/signup', expressAsyncHandler(async (req, res) => {
    const { email, firstName } = req.body;
    
    if (!email || !firstName) {
        return res.status(400).json({ error: 'Email and firstName are required' });
    }

    try {
        // Check if user already exists
        let user = await UserModel.findOne({ email });
        
        if (user) {
            // If user exists, update their information
            user.firstName = firstName;
            await user.save();
        } else {
            // Create new user
            user = new UserModel({
                email,
                firstName
            });
            await user.save();
        }
        
        res.status(201).json({
            success: true,
            user: {
                email: user.email,
                firstName: user.firstName
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            error: 'Failed to create user',
            details: error.message 
        });
    }
}));

module.exports = authRoute