import {updatePlayIcons, updateElementIcon} from './api_deezer.js';

class Player{
    constructor(trackList = [], volume = 0.5, nowPlaying = ''){
        this.tracks = trackList,
        this.volume = volume,
        this.trackPlaying = nowPlaying
    }

    resume(element = undefined){
        if(this.trackPlaying){
            this.trackPlaying.volume = this.volume;
            this.trackPlaying.play();
            playerHTML.classList.remove("fa-play");
            playerHTML.classList.add("fa-pause");
            playerHTML.onclick = () => this.pause();
            element ? updateElementIcon(element) : updatePlayIcons(true);
        }
    }

    pause(element = undefined){
        this.trackPlaying.pause();
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

    setOnTrackEnded(element = undefined){
        this.trackPlaying.addEventListener('ended', () => {
            this.trackPlaying.currentTime = 0;
            element ? this.pause(element) : this.pause();
        });
    }
}


let playerHTML = document.getElementById("iconPlayerPlay");


export { Player }