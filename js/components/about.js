document.addEventListener('DOMContentLoaded', function() {
    initializeAboutVideo();
    
    // Listen for the aboutLoaded event in case content loads dynamically
    document.addEventListener('aboutLoaded', initializeAboutVideo);
});

function initializeAboutVideo() {
    const aboutVideo = document.getElementById('aboutVideo');
    const customPlayBtn = document.getElementById('customPlayBtn');
    
    if (!aboutVideo || !customPlayBtn) return;
    
    // Initially hide video controls
    aboutVideo.controls = false;
    
    // Add click handler to the custom play button
    customPlayBtn.addEventListener('click', function() {
        // Get video source from data-src attribute
        const videoSource = aboutVideo.querySelector('source');
        if (!videoSource) return;
        
        const videoSrc = videoSource.getAttribute('data-src');
        if (!videoSrc) return;
        
        // Set the actual src attribute to load the video
        videoSource.setAttribute('src', videoSrc);
        
        // Remove the data-src attribute to prevent reloading
        videoSource.removeAttribute('data-src');
        
        // Load and play the video
        aboutVideo.load();
        aboutVideo.style.display = 'block'; // Make sure video is visible
        
        // Start the video
        aboutVideo.play()
            .then(() => {
                // Video started successfully
                aboutVideo.classList.add('playing');
                aboutVideo.controls = true;  // Show the native controls now
                customPlayBtn.style.display = 'none';  // Hide the custom play button
                console.log("Video playing successfully");
            })
            .catch(error => {
                console.error("Error playing video:", error);
                // Fallback - show controls if autoplay fails
                aboutVideo.controls = true;
                customPlayBtn.style.display = 'none';
            });
    });
    
    // If the video is paused, show the custom play button again
    aboutVideo.addEventListener('pause', function() {
        if (aboutVideo.currentTime > 0 && !aboutVideo.ended) {
            customPlayBtn.style.display = 'flex';
            aboutVideo.controls = false;
        }
    });
    
    // If the video ends, show the custom play button again
    aboutVideo.addEventListener('ended', function() {
        customPlayBtn.style.display = 'flex';
        aboutVideo.controls = false;
    });
}
