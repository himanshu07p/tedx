const heroSection = () => {
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('hero');

    const video = document.createElement('video');
    video.src = 'path/to/your/video.mp4'; // Replace with the actual video path
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.classList.add('hero-video');

    const overlay = document.createElement('div');
    overlay.classList.add('hero-overlay');

    const title = document.createElement('h1');
    title.textContent = 'Welcome to TEDx College Conference';
    title.classList.add('hero-title');

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Inspiring Ideas Worth Spreading';
    subtitle.classList.add('hero-subtitle');

    overlay.appendChild(title);
    overlay.appendChild(subtitle);
    heroContainer.appendChild(video);
    heroContainer.appendChild(overlay);

    document.body.prepend(heroContainer);
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Hero section loaded with video background');
    
    // Check if the hero element exists
    const heroContainer = document.querySelector('.hero');
    if (!heroContainer) return;
    
    // Check if there's already a video element
    let videoElement = heroContainer.querySelector('video');
    
    // If no video element exists, create one
    if (!videoElement) {
        videoElement = document.createElement('video');
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.classList.add('hero-video');
        
        // Add source
        const source = document.createElement('source');
        source.src = 'assets/video/hero-video.mp4';
        source.type = 'video/mp4';
        
        videoElement.appendChild(source);
        videoElement.appendChild(document.createTextNode('Your browser does not support the video tag.'));
        
        // Insert video before the overlay
        const overlay = heroContainer.querySelector('.hero-overlay');
        if (overlay) {
            heroContainer.insertBefore(videoElement, overlay);
        }
    } else {
        // If video element exists, ensure it has the proper attributes
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        
        // Make sure the video is visible and has proper classes
        videoElement.style.display = 'block';
        videoElement.classList.add('hero-video');
        
        // Check if source exists, if not add it
        if (videoElement.querySelector('source') === null) {
            const source = document.createElement('source');
            source.src = 'assets/video/hero-video.mp4';
            source.type = 'video/mp4';
            videoElement.appendChild(source);
        }
    }
    
    // Force play video (helpful for some mobile browsers)
    videoElement.play();
    
    // Log video status for debugging
    videoElement.addEventListener('play', () => {
        console.log('Video started playing');
    });
    
    videoElement.addEventListener('error', (e) => {
        console.error('Video error:', e);
    });
});