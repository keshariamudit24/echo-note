const express = require('express');
const authRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
const  UserModel = require('../schemas/userSchema');
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
        // Check if user already exists
        let user = await UserModel.findOne({ email: clerkUser.email });
        
        if (user) {
            // If user exists, update their information
            user.firstName = clerkUser.firstName;
            await user.save();
        } else {
            // Create new user
            user = new UserModel({
                email: clerkUser.email,
                firstName: clerkUser.firstName
            });
            await user.save();
        }
        return user;
    } catch (error) {
        console.error('Error creating/updating user:', error);
        throw error;
    }
}

// Route to handle Clerk webhook or frontend auth request
authRoute.post('/signin', expressAsyncHandler(async (req, res) => {
    const { email, firstName } = req.body;
    
    if (!email || !firstName) {
        console.log('Missing required fields:', { email, firstName });
        return res.status(400).json({ error: 'Email and firstName are required' });
    }
    
    try {
        console.log('Attempting to create/update user:', { email, firstName });
        const user = await handleClerkSignin({ email, firstName });
        
        // Verify the user was saved correctly
        const verifiedUser = await UserModel.findOne({ email });
        if (!verifiedUser) {
            throw new Error('User was not saved to database');
        }
        
        console.log('User successfully saved:', verifiedUser);
        res.status(200).json(user);
    } catch (error) {
        console.error('Failed to create/update user:', error);
        res.status(500).json({ 
            error: 'Failed to create/update user',
            details: error.message
        });
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

authRoute.post("/store/db", expressAsyncHandler(async (req, res) => {
    const { email, firstName } = req.body
    const checkUser = await UserModel.findOne({ email });
    if(!checkUser){ 
        // create one 
        const newUser = new UserModel({
            email,
            firstName
        })
        await newUser.save();
        return res.status(201).json({ message: "User created", user: newUser });
    } else {
        return res.status(200).json({ message: "User already exists", user: checkUser });
    }
}))

module.exports = authRoute