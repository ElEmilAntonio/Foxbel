import {updatePlayIcons, updateElementIcon} from './api_deezer.js';

class Player{
    timing = undefined;

    constructor(trackList = [], volume = 0.5, nowPlaying = ''){
        this.tracks = trackList,
        this.volume = volume,
        this.trackPlaying = nowPlaying
    }

    resume(element = undefined){
        if(this.trackPlaying){
            this.trackPlaying.volume = this.volume;
            this.trackPlaying.play();
            
            let timingPlayer = document.getElementById("playerTime");
            let bar = document.getElementById("playerBar");
            bar.style.width = '0px';

            this.timing = setInterval(()=>{
                timingPlayer.innerHTML = formatTime(Math.round(this.trackPlaying.currentTime));
                let widthScreen = window.innerWidth;
                let barIncrement = widthScreen/this.trackPlaying.duration;
                bar.style.width = (barIncrement*Math.round(this.trackPlaying.currentTime))+'px';
            }, 0);
            playerHTML.classList.remove("fa-play");
            playerHTML.classList.add("fa-pause");
            playerHTML.onclick = () => this.pause();
            element ? updateElementIcon(element) : updatePlayIcons(true);
        }
    }

    pause(element = undefined){
        this.trackPlaying.pause();
        clearInterval(this.timing);
        playerHTML.classList.add("fa-play");
        playerHTML.classList.remove("fa-pause");
        playerHTML.onclick = () => this.resume();
        localStorage.setItem("currentTimePlaying", this.trackPlaying.currentTime);
        element ? updateElementIcon(element) : updatePlayIcons();
    }

    setTracks(newTracks) { this.tracks = newTracks }

    setVolume(volumeHTML){
        this.volume = volumeHTML.value;
        this.trackPlaying.volume = volumeHTML.value;
        //Store volume value
        localStorage.setItem("playerVolume", volumeHTML.value);
        //Update icons
        let volumeIcon = document.getElementById("volumeIcon");
        if(this.volume >= 0.5) return volumeIcon.innerHTML = 'volume_up';
        if(this.volume >= 0.01) return volumeIcon.innerHTML = 'volume_down';
        volumeIcon.innerHTML = 'volume_off';
    }

    isTrackSet(){
        return this.trackPlaying == '' ? false : true;
    }

    setCurrentTime(currentTimePlaying){
        this.trackPlaying.onloadedmetadata = () => {
            let bar = document.getElementById("playerBar");
            let widthScreen = window.innerWidth;
            let barIncrement = widthScreen/this.trackPlaying.duration;
            bar.style.width = (barIncrement*Math.round(this.trackPlaying.currentTime))+'px';
        }
        this.trackPlaying.currentTime = currentTimePlaying;
        let timingPlayer = document.getElementById("playerTime");
        timingPlayer.innerHTML = formatTime(this.trackPlaying.currentTime);
    }

    setOnTrackEnded(element = undefined){
        this.trackPlaying.addEventListener('ended', () => {
            clearInterval(this.timing);
            this.trackPlaying.currentTime = 0;
            this.trackPlaying.pause();
            element ? this.pause(element) : this.pause();
        });
    }
}

let playerHTML = document.getElementById("iconPlayerPlay");

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

export { Player }