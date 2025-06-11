

export async function uploadScreenShot(base64Image, userEmail, sessionId) {

    const payload = {
        image: base64Image,
        userEmail: userEmail,
        sessionId: sessionId
    };

    console.log("Session Id in api",payload.sessionId);

    console.log("Uploading screenshot");
    const response = await fetch('http://localhost:3000/screenshot/ocr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error('Failed to upload screenshot', response.json());
    }
    else{
        console.log("Image uploaded");
    }
    return await response.json();
}

export async function getSessionId(userEmail, title) {
    const payload = {
        userEmail: userEmail,
        title: title,
    };

    try {
        const response = await fetch('http://localhost:3000/extension/api/session-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Successfully fetched session Id:', data);
            return data.payload?.sessionId || null;
        } else {
            console.warn('Failed to fetch session ID:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error while fetching session ID:', error);
        return null;
    }
}
