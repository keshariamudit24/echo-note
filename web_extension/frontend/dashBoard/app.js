let isRecording = false;
        let recordingStartTime = null;
        let recordingTimer = null;
        let userName,userEmail;
        

       async function initializeDashboard()  {
            // Load user data
            const result = await chrome.storage.local.get(['loggedInUserName', 'loggedInUserEmail']);
            userName = decodeURIComponent(result.loggedInUserName); 
            const userData = {
                name: userName, // This would be dynamically loaded
                email: userEmail
            };  
            document.getElementById('userName').textContent = userData.name;
            
            // Check for any ongoing recordings
            checkRecordingStatus();
        }

       initializeDashboard();