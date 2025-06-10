chrome.storage.local.get("clerkSession", (result) => {
  const session = result.clerkSession;

  if (session && session.userId) {
    window.location.href = "dashBoard/dashboard.html";
  } else {
    window.location.href = "Authentication/signin.html";
  }
});
