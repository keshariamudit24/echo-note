// // src/components/SetUserCookie.jsx
// import React, { useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import Cookies from 'js-cookie'; // If you're using js-cookie

// const SetUserCookie = () => {
//   const { user, isSignedIn } = useUser();

//   useEffect(() => {
//     if (isSignedIn && user) {
//       const userEmail = user.primaryEmailAddress?.emailAddress;
//       const userName = user.fullName || user.username || user.primaryEmailAddress?.emailAddress; // Fallback for user name

//       if (userEmail) {
//         // Option 1: Using js-cookie (recommended for cleaner syntax)
//         Cookies.set('my_app_user_email', userEmail, { expires: 7, secure: true, sameSite: 'Lax' });
//         Cookies.set('my_app_user_name', userName, { expires: 7, secure: true, sameSite: 'Lax' });
//         console.log('User email and name cookies set successfully!');

//         // Option 2: Using document.cookie directly
//         // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // 7 days expiration
//         // document.cookie = `my_app_user_email=${userEmail}; expires=${expires}; path=/; secure; samesite=Lax`;
//         // document.cookie = `my_app_user_name=${encodeURIComponent(userName)}; expires=${expires}; path=/; secure; samesite=Lax`; // Encode name for special chars
//       }
//     }
//   }, [isSignedIn, user]);

//   return null; // This component doesn't render anything visible
// };

// export default SetUserCookie;

import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie'; 

/**
 * SetUserCookie Component
 * This component handles setting and clearing user cookies based on Clerk's
 * authentication state (isSignedIn and user object availability).
 *
 * It sets cookies upon successful sign-in and clears them upon sign-out.
 * Make sure to install 'js-cookie': `npm install js-cookie` or `yarn add js-cookie`
 */
const SetUserCookie = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // --- Logic for Setting Cookies (when signed in) ---
      const userEmail = user.primaryEmailAddress?.emailAddress;
      // Get the full name, or fallback to username, or email if name isn't available
      const userName = user.fullName || user.username || user.primaryEmailAddress?.emailAddress;

      if (userEmail) {
        // Set the 'my_app_user_email' cookie
        // 'expires': Sets the cookie to expire in 7 days. Adjust as needed.
        // 'secure': CRUCIAL for production. Ensures cookie is only sent over HTTPS.
        //           Your Clerk app MUST be served over HTTPS for this to work correctly.
        // 'sameSite': 'Lax' is a good default for security. It sends cookies
        //             on cross-site requests if they are top-level navigations.
        Cookies.set('my_app_user_email', userEmail, { expires: 7, secure: true, sameSite: 'Lax' });
        
        // Set the 'my_app_user_name' cookie
        // Use encodeURIComponent to handle special characters in names
        Cookies.set('my_app_user_name', encodeURIComponent(userName), { expires: 7, secure: true, sameSite: 'Lax' });
        
        console.log('User email and name cookies set successfully!');
      } else {
        console.warn('User email not available, unable to set cookies.');
      }
    } else if (!isSignedIn) {
      // --- Logic for Clearing Cookies (when signed out) ---
      // This block will execute when the user is no longer signed in.
      console.log('User signed out. Clearing custom cookies...');
      Cookies.remove('my_app_user_email');
      Cookies.remove('my_app_user_name');
      console.log('Custom cookies cleared.');

      // You might also want to clear data from the extension's local storage here
      // though the extension's popup.js and dashboard.js also handle this on their side.
      // This ensures consistency across the web app and extension.
      // await chrome.storage.local.remove(['loggedInUserEmail', 'loggedInUserName']);
      // console.log("Cleared user data from extension storage.");
    }
  }, [isSignedIn, user]); // Dependency array: Effect runs when isSignedIn or user object changes

  // This component does not render any visible UI
  return null;
};

export default SetUserCookie;