// api.js

export async function uploadScreenShot(base64Image, title, timestamp, userEmail, sessionId) {

    const payload = {
        image: base64Image,
        title: title,
        time: timestamp,
        userEmail: userEmail,
        sessionId: sessionId
    };

    console.log("Uploading screenshot");
    const response = await fetch('https://your-backend-api.com/upload-screenshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error('Failed to upload screenshot', response.json());
    }
    return await response.json();
}

export async function getSessionId(userEmail,title){
    const payload={
        userEmail: userEmail,
        title: title,
    }
    console.log("fetching session Id");
    const response=await fetch('',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if(response.status==200){
        console.log('Successfully fetched session Id: ', await response.json());
    }
    return await response.json();
};