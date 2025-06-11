const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Clerk authentication middleware
const requireAuth = ClerkExpressRequireAuth({
    // Specify the routes that don't require authentication
    publicRoutes: ['/auth/signin', '/auth/signup'],
    // Optional: Custom error handling
    onError: (err, req, res) => {
        console.error('Auth error:', err);
        res.status(401).json({ error: 'Unauthorized access' });
    }
});

module.exports = requireAuth;