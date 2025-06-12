// src/components/SetUserCookie.jsx
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie'; // If you're using js-cookie

const SetUserCookie = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      const userName = user.fullName || user.username || user.primaryEmailAddress?.emailAddress; // Fallback for user name

      if (userEmail) {
        // Option 1: Using js-cookie (recommended for cleaner syntax)
        Cookies.set('my_app_user_email', userEmail, { expires: 7, secure: true, sameSite: 'Lax' });
        Cookies.set('my_app_user_name', userName, { expires: 7, secure: true, sameSite: 'Lax' });
        console.log('User email and name cookies set successfully!');

        // Option 2: Using document.cookie directly
        // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // 7 days expiration
        // document.cookie = `my_app_user_email=${userEmail}; expires=${expires}; path=/; secure; samesite=Lax`;
        // document.cookie = `my_app_user_name=${encodeURIComponent(userName)}; expires=${expires}; path=/; secure; samesite=Lax`; // Encode name for special chars
      }
    }
  }, [isSignedIn, user]);

  return null; // This component doesn't render anything visible
};

const ClearUserCookie = ()=> {
  useEffect(() => {
    Cookies.remove("my_app_user_name");
    Cookies.remove("my_app_user_email");
  }, []);

  return null; // this component does not render anything
}

export {SetUserCookie,ClearUserCookie};