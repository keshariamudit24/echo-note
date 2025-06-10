chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === "CLERK_SESSION") {
    chrome.storage.local.set({ clerkSession: message.session }, () => {
      console.log("Stored Clerk session");
      sendResponse({ success: true });
    });
    return true; // Required for async response
  }
});