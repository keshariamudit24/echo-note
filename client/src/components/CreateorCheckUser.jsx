// src/components/SetUserCookie.jsx
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios'

const CreateOrCheckUser = ()=> {
    const { user, isSignedIn } = useUser();

  useEffect(() => {
    // Create an async function inside useEffect
    async function saveUserToDatabase() {
      if (isSignedIn && user) {
        try {
            const email = user.primaryEmailAddress?.emailAddress
            const firstName = user.fullName || user.username || user.primaryEmailAddress?.emailAddress
            const response = await axios.post('http://localhost:3000/auth/store/db', { email, firstName }); 
            
            if (response.status >= 200 && response.status < 300) {
                console.log('User data saved successfully:', response.data);
            } else {
                console.error('Failed to save user data, status:', response.status);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
      }
    }
    
    // Call the async function immediately
    saveUserToDatabase();
  }, [isSignedIn, user]);

  return null;
}

export { CreateOrCheckUser };