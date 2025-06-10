let isRecording = false;
        let recordingStartTime = null;
        let recordingTimer = null;

        // Simulate user data (in real app, this would come from your auth system)
        const userData = {
            name: "Alex Johnson", // This would be dynamically loaded
            email: "alex@example.com"
        };

        function initializeDashboard() {
            // Load user data
            document.getElementById('userName').textContent = userData.name;
            
            // Check for any ongoing recordings
            checkRecordingStatus();
        }

        function toggleRecording() {
            if (!isRecording) {
                startRecording();
            } else {
                stopRecording();
            }
        }

        function startRecording() {
            console.log('Starting full screen recording...');
            
            // Update recording state
            isRecording = true;
            recordingStartTime = Date.now();
            
            // Update UI elements
            const recordButton = document.getElementById('recordButton');
            const recordIcon = document.getElementById('recordIcon');
            const recordText = document.getElementById('recordText');
            const statusIndicator = document.getElementById('statusIndicator');
            const statusText = document.getElementById('statusText');
            
            recordButton.classList.add('recording');
            recordIcon.textContent = '⏹️';
            recordText.textContent = 'Stop Recording';
            
            statusIndicator.classList.add('recording');
            statusText.textContent = 'Recording in progress...';
            
            // Start recording timer
            startRecordingTimer();
            
            // In real implementation, you would use Chrome extension APIs:
            /*
            chrome.desktopCapture.chooseDesktopMedia(['screen'], (streamId) => {
                if (streamId) {
                    // Get the media stream and start recording
                    navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: streamId
                            }
                        }
                    }).then(stream => {
                        // Handle the recording stream
                        // Send to your backend API
                    });
                }
            });
            */
        }

        function stopRecording() {
            console.log('Stopping recording...');
            
            // Update recording state
            isRecording = false;
            recordingStartTime = null;
            
            // Clear timer
            if (recordingTimer) {
                clearInterval(recordingTimer);
                recordingTimer = null;
            }
            
            // Update UI elements
            const recordButton = document.getElementById('recordButton');
            const recordIcon = document.getElementById('recordIcon');
            const recordText = document.getElementById('recordText');
            const statusIndicator = document.getElementById('statusIndicator');
            const statusText = document.getElementById('statusText');
            
            recordButton.classList.remove('recording');
            recordIcon.textContent = '🔴';
            recordText.textContent = 'Start Full Screen Recording';
            
            statusIndicator.classList.remove('recording');
            statusText.textContent = 'Processing recording...';
            
            // Simulate processing time
            setTimeout(() => {
                statusText.textContent = 'Ready to record';
            }, 3000);
            
            // Here you would send the recorded data to your backend API
            // sendRecordingToAPI(recordedData);
        }

        function startRecordingTimer() {
            recordingTimer = setInterval(() => {
                if (recordingStartTime) {
                    const elapsed = Date.now() - recordingStartTime;
                    const minutes = Math.floor(elapsed / 60000);
                    const seconds = Math.floor((elapsed % 60000) / 1000);
                    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    
                    document.getElementById('statusText').textContent = `Recording... ${timeString}`;
                }
            }, 1000);
        }

        function visitWebsite() {
            // Replace with your actual website URL
            const websiteUrl = 'https://your-website.com';
            
            // For browser extension:
            // chrome.tabs.create({ url: websiteUrl });
            
            // For testing:
            window.open(websiteUrl, '_blank');
        }

        function logout() {
            // Clear any ongoing recordings
            if (isRecording) {
                stopRecording();
            }
            
            // Clear user data
            // In real app, clear auth tokens, etc.
            
            // Redirect back to sign-in (in extension, you'd switch to the sign-in page)
            console.log('Logging out...');
            
            // For extension: redirect to sign-in page or close popup
            // window.location.href = 'signin.html';
        }

        function checkRecordingStatus() {
            // In real implementation, check if there's an ongoing recording
            // This could come from chrome.storage or your backend
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', initializeDashboard);

        // Handle extension lifecycle
        window.addEventListener('beforeunload', () => {
            // Save recording state if needed
            if (isRecording) {
                // Save state to chrome.storage for persistence
            }
        });