function redirectToSignin() {
 // Replace this URL with your actual sign-in page
const signinUrl = 'https://your-website.com/signin';            
// For browser extension, you would typically use:
// chrome.tabs.create({ url: signinUrl });            
// For testing in browser, use:
window.open(signinUrl, '_blank');
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
// Add event listener to sign-in button
    const signinButton = document.getElementById('signinButton');
    if (signinButton) {
    signinButton.addEventListener('click', redirectToSignin);
    }
                
    const features = document.querySelectorAll('.feature-icon');
                
    // Stagger animation for features
    features.forEach((feature, index) => {
        feature.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        feature.style.opacity = '0';
    });
});