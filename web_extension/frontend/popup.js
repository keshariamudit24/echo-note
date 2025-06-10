chrome.runtime.sendMessage(
  "your-extension-id",  // if using onMessageExternal, else omit
  { type: "REQUEST_SESSION" },
  (response) => {
    if (response?.session) {
      chrome.storage.local.set({ clerkSession: response.session }, () => {
        console.log("✅ Got and stored session from website");
        window.location.href = "dashBoard/dashboard.html";
      });
    } else {
      window.location.href = "Authentication/signin.html";
    }
  }
);
