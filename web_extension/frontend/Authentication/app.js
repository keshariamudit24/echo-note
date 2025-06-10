document.getElementById("signinButton").addEventListener("click", () => {
  // Open your website where Clerk React handles sign in
  chrome.tabs.create({ url: "http://localhost:5173/" });
});

// Poll every 2 seconds to check if user has logged in
const intervalId = setInterval(() => {
  chrome.storage.local.get("clerkSession", (result) => {
    const session = result.clerkSession;

    if (session && session.userId) {
      clearInterval(intervalId); // stop polling
      window.location.href = "../dashBoard/dashBoard.html";
    }
  });
}, 2000);
