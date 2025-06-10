// chrome.runtime.sendMessage(
//   "your-extension-id",  // if using onMessageExternal, else omit
//   { type: "REQUEST_SESSION" },
//   (response) => {
//     if (response?.session) {
//       chrome.storage.local.set({ clerkSession: response.session }, () => {
//         console.log("✅ Got and stored session from website");
//         window.location.href = "dashBoard/dashboard.html";
//       });
//     } else {
//       window.location.href = "Authentication/signin.html";
//     }
//   }
// );

// window.location.href = "dashBoard/dashboard.html";


// Add an event listener to run code once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // We no longer need to get references to the HTML elements
  // const userEmailSpan = document.getElementById('userEmailDisplay');
  // const userNameSpan = document.getElementById('userNameDisplay');

  // IMPORTANT: This MUST be the EXACT URL where your React app sets the cookies.
  // Use "https://your-react-app-domain.com/" for your deployed app,
  // and "http://localhost:3000/" if you are testing locally.
  const reactAppUrl = "http://localhost:5173/"; // Replace with your actual app URL
  // The names of the cookies you set in your React app
  const emailCookieName = "my_app_user_email";
  const nameCookieName = "my_app_user_name";

  let cookiesFound = false; // Flag to track if both necessary cookies are found

  // --- Attempt to retrieve the email cookie ---
  try {
    const emailCookie = await chrome.cookies.get({ url: reactAppUrl, name: emailCookieName });

    if (emailCookie && emailCookie.value) {
      console.log('Accessed email cookie:', emailCookie.value);
      await chrome.storage.local.set({ loggedInUserEmail: emailCookie.value });
      console.log('Email stored in chrome.storage.local');
      cookiesFound = true; // Set to true if email cookie is found
    } else {
      console.log('Email cookie not found.');
      await chrome.storage.local.remove('loggedInUserEmail'); 
      cookiesFound = false; // If email cookie is not found, set to false
    }
  } catch (error) {
    console.error("Error accessing email cookie:", error);
    cookiesFound = false; // On error, assume cookies are not found
  }

  // Only proceed to check name cookie if email cookie was found
  // This prevents unnecessary checks if the primary identifier (email) is missing
  if (cookiesFound) {
    // --- Attempt to retrieve the name cookie ---
    try {
      const nameCookie = await chrome.cookies.get({ url: reactAppUrl, name: nameCookieName });

      if (nameCookie && nameCookie.value) {
        const decodedUserName = decodeURIComponent(nameCookie.value);
        console.log('Accessed name cookie:', decodedUserName);
        await chrome.storage.local.set({ loggedInUserName: decodedUserName });
        // localStorage.set("userName",decodedUserName);
        console.log('Name stored in chrome.storage.local');
        // cookiesFound remains true if name cookie is also found
      } else {
        console.log('Name cookie not found.');
        await chrome.storage.local.remove('loggedInUserName');
        cookiesFound = false; // If name cookie is not found, set to false
      }
    } catch (error) {
      console.error("Error accessing name cookie:", error);
      cookiesFound = false; // On error, assume cookies are not found
    }
  }

  // --- Redirection Logic ---
  if (cookiesFound) {
    console.log("Both email and name cookies found. Redirecting to dashboard...");
    // localStorage.setItem("my_app_user_name",nameCookieName);
    window.location.href = "dashBoard/dashboard.html"; // Redirect to dashboard if cookies are found
  } else {
    console.log("One or both required cookies not found. Redirecting to signin...");
    window.location.href = "Authentication/signin.html"; // Redirect to signin if cookies are not found
  }
});
