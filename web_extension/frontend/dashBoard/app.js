import { uploadScreenShot } from './api.js';


// //video
// const recordButton = document.getElementById('recordButton');

// recordButton.addEventListener('click', () => {
//     toggleRecording();
// });

// const titleInput = document.getElementById('recordingTitle');

// titleInput.addEventListener('input', () => {
//     const title = titleInput.value.trim();
//     recordButton.disabled = title === '';
// });


// let isRecording = false;
// let recordingStartTime = null;
// let recordingTimer = null;
// let userName, userEmail;

// async function initializeDashboard() {
//     const result = await chrome.storage.local.get(['loggedInUserName', 'loggedInUserEmail']);
//     userName = decodeURIComponent(result.loggedInUserName);
//     userEmail = decodeURIComponent(result.loggedInUserEmail);
//     const userData = {
//         name: userName,
//         email: userEmail
//     };
//     document.getElementById('userName').textContent = userData.name;
//     console.log(userData);
// }

// initializeDashboard();

// let mediaRecorder;
// let recordedChunks = [];

// // Timer
// let timerInterval = null;
// let startTime = null;

// // UI references
// const recordIcon = document.getElementById('recordIcon');
// const recordText = document.getElementById('recordText');
// const statusText = document.getElementById('statusText');
// const statusDot = document.querySelector('.status-dot');
// const timerDisplay = document.getElementById('recordingTimer');
// const timerText = document.getElementById('timerText');

// function updateUi(recording) {
//     if (recording) {
//         recordIcon.textContent = '⏹️';
//         recordText.textContent = 'Stop Recording';
//         statusText.textContent = 'Recording...';
//         statusDot.style.backgroundColor = 'red';
//         timerDisplay.style.display = 'block';
//     } else {
//         recordIcon.textContent = '🔴';
//         recordText.textContent = 'Start Full Screen Recording';
//         statusText.textContent = 'Recording stopped';
//         statusDot.style.backgroundColor = 'gray';
//         timerDisplay.style.display = 'none';
//         timerText.textContent = '00:00';
//     }
// }

// function updateTimer() {
//     const elapsedMs = Date.now() - startTime;
//     const totalSeconds = Math.floor(elapsedMs / 1000);
//     const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
//     const seconds = String(totalSeconds % 60).padStart(2, '0');
//     timerText.textContent = `${minutes}:${seconds}`;
// }

// function updateTitleField(isRecording){
//     if(isRecording){
//         //disable ediditing
//         titleInput.disabled = true;
//     }
//     else{
//         titleInput.disabled = false;
//         titleInput.value = '';
//         recordButton.disabled = true;
//     }
// }

// async function toggleRecording() {
//     const title = titleInput.value.trim();
//     if (!title) {
//         alert("Please enter a valid recording title.");
//         return;
//     }

//     if (!isRecording) {
//         try {
//             const stream = await navigator.mediaDevices.getDisplayMedia({
//                 video: true
//             });

//             mediaRecorder = new MediaRecorder(stream);
//             recordedChunks = [];

//             mediaRecorder.ondataavailable = (e) => {
//                 if (e.data.size > 0) recordedChunks.push(e.data);
//             };

//             mediaRecorder.onstop = () => {
//                 clearInterval(timerInterval);
//                 const blob = new Blob(recordedChunks, { type: "video/webm" });
//                 const url = URL.createObjectURL(blob);

//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `${title.replace(/\s+/g, '_')}.webm`;// title for the video
//                 a.click();

//                 URL.revokeObjectURL(url);
//                 updateUi(false);
//                 updateTitleField(false);
//             };

//             // Handle Chrome's "Stop Sharing" button
//             stream.getVideoTracks()[0].onended = () => {
//                 if (isRecording) {
//                     mediaRecorder.stop();
//                     isRecording = false;
//                     clearInterval(timerInterval);
//                     updateUi(false);
//                     updateTitleField(false);
//                 }
//             };

//             mediaRecorder.start();
//             isRecording = true;
//             startTime = Date.now();
//             updateUi(true);
//             updateTitleField(true);
//             updateTimer(); // Show 00:00 immediately
//             timerInterval = setInterval(updateTimer, 1000);

//         } catch (err) {
//             console.error("Error accessing display media:", err);
//             alert("Failed to start screen recording.");
//         }
//     } else {
//         mediaRecorder.stop();
//         isRecording = false;
//         clearInterval(timerInterval);
//         mediaRecorder.stream.getTracks().forEach(track => track.stop());
//         updateUi(false);
//         updateTitleField(false);
//     }
// }


//video
const recordButton = document.getElementById('recordButton');

recordButton.addEventListener('click', () => {
    toggleRecording();
});

const titleInput = document.getElementById('recordingTitle');

titleInput.addEventListener('input', () => {
    const title = titleInput.value.trim();
    recordButton.disabled = title === '';
});


let isRecording = false;
let userName, userEmail;

async function initializeDashboard() {
    const result = await chrome.storage.local.get(['loggedInUserName', 'loggedInUserEmail']);
    userName = decodeURIComponent(result.loggedInUserName);
    userEmail = decodeURIComponent(result.loggedInUserEmail);
    const userData = {
        name: userName,
        email: userEmail
    };
    document.getElementById('userName').textContent = userData.name;
    console.log(userData);
}

initializeDashboard();

// Timer
let timerInterval = null;
let startTime = null;

// UI references
const recordIcon = document.getElementById('recordIcon');
const recordText = document.getElementById('recordText');
const statusText = document.getElementById('statusText');
const statusDot = document.querySelector('.status-dot');
const timerDisplay = document.getElementById('recordingTimer');
const timerText = document.getElementById('timerText');

function updateUi(recording) {
    if (recording) {
        recordIcon.textContent = '⏹️';
        recordText.textContent = 'Stop Recording';
        statusText.textContent = 'Recording...';
        statusDot.style.backgroundColor = 'red';
        timerDisplay.style.display = 'block';
    } else {
        recordIcon.textContent = '🔴';
        recordText.textContent = 'Start Full Screen Recording';
        statusText.textContent = 'Recording stopped';
        statusDot.style.backgroundColor = 'gray';
        timerDisplay.style.display = 'none';
        timerText.textContent = '00:00';
    }
}

function updateTimer() {
    const elapsedMs = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    timerText.textContent = `${minutes}:${seconds}`;
}

function updateTitleField(isRecording){
    if(isRecording){
        //disable ediditing
        titleInput.disabled = true;
    }
    else{
        titleInput.disabled = false;
        titleInput.value = '';
        recordButton.disabled = true;
    }
}

let screenshotInterval = null;
let captureStream = null;
let sessionId=null;

async function toggleRecording() {
    const title = titleInput.value.trim();
    if (!title) {
        alert("Please enter a valid recording title.");
        return;
    }

    if(!sessionId){
        //fetch sessio id using email
        
    }

    if (!isRecording) {
        try {
            captureStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            isRecording = true;
            startTime = Date.now();

            updateUi(true);
            updateTitleField(true);
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);

            const video = document.createElement("video");
            video.srcObject = captureStream;
            video.muted=true;
            video.play();

            video.addEventListener('loadedmetadata', () => {
                // First screenshot after video is ready
                captureScreenshot(video, title, Date.now());
                
                // Start interval for repeated screenshots
                screenshotInterval = setInterval(() => {
                    captureScreenshot(video, title, Date.now());
                }, 2000);
            });

            // Stop when screen sharing is ended manually
            captureStream.getVideoTracks()[0].onended = () => {
                stopRecordingScreenshots();
            };

        } catch (err) {
            console.error("Error accessing display media:", err);
            alert("Failed to start screen capture.");
        }

    } else {
        stopRecordingScreenshots();
    }
}

//download the screenshot function
// function captureScreenshot(videoElement, title) {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoElement.videoWidth;
//     canvas.height = videoElement.videoHeight;

//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//     //drawing the current video frame into canvas

//     canvas.toBlob(blob => {
//         const url = URL.createObjectURL(blob);
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//         chrome.downloads.download({
//             url: url,
//             filename: `${title.replace(/\s+/g, '_')}_${timestamp}.png`,
//             saveAs: false
//         }, () => {
//             URL.revokeObjectURL(url);
//         });
//     }, 'image/png');
// }

function captureScreenshot(videoElement, title, userEmail, sessionId) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext('2d');
    // ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    if (videoElement.readyState >= 2) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result.split(',')[1]; // remove data:image/png;base64,
                    const timestamp = new Date().toISOString();

                    // Call your custom function
                    uploadScreenShot(base64Image, title, timestamp, userEmail, sessionId);
                };
                if (blob) {
                    reader.readAsDataURL(blob);
                } else {
                    console.error("Blob is null");
                } // Converts blob to base64
            },
        'image/png');
    } else {
        console.warn("Video not ready yet to capture screenshot.");
    }

    
}



function stopRecordingScreenshots() {
    isRecording = false;
    clearInterval(timerInterval);
    clearInterval(screenshotInterval);

    if (captureStream) {
        captureStream.getTracks().forEach(track => track.stop());
    }

    updateUi(false);
    updateTitleField(false);
}

