const playPauseBtn = document.querySelector('.player-controls img:nth-child(3)'); // Center play/pause icon
const progressBar = document.querySelector('.progress-bar');
const currTimeEl = document.querySelector('.curr-time');
const totTimeEl = document.querySelector('.tot-time');

const volumeBar = document.querySelector('.range-bar');
const volumeIcon = document.querySelector('.controls i.fa-volume-xmark'); // Selects the volume icon

const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

let isPlaying = false;

//  Play / Pause Functionality
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        // Switch back to the play icon (Update this if your icon filename is different)
        playPauseBtn.src = "./assets/player_icon3.png"; 
    } else {
        audio.play();
        playPauseBtn.style.transform = "scale(1.1)";
    }
    isPlaying = !isPlaying;
}

playPauseBtn.addEventListener('click', togglePlay);

//  Format Time (Seconds to MM:SS)
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = `0${sec}`;
    if (min < 10) min = `0${min}`;
    return `${min}:${sec}`;
}

// 5. Update Progress Bar & Time Displays as Song Plays
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        // Calculate percentage
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        
        // Update current time text
        currTimeEl.textContent = formatTime(audio.currentTime);
    }
});

// Update total duration once metadata loads
audio.addEventListener('loadedmetadata', () => {
    totTimeEl.textContent = formatTime(audio.duration);
});

// 6. Seek functionality (User drags the progress bar)
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// 7. Volume Control functionality
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
    
    // Mute/Unmute visual indicator tweak
    if (audio.volume === 0) {
        volumeIcon.style.opacity = "0.4";
    } else {
        volumeIcon.style.opacity = "1";
    }
});