import { Player } from './player.js';
import {Track} from './track.js';

const appID = '489402';
const channelURL = 'http://localhost/foxbel-music/dist/channel.html';
let user = {
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    accessToken: localStorage.getItem("userToken"),
    status: localStorage.getItem("userStatus")
};

let trackPlayingId = localStorage.getItem("trackPlayingId");
let trackList = JSON.parse(localStorage.getItem("trackList"));
let playerVolume = localStorage.getItem("playerVolume");
let currentTimePlaying = localStorage.getItem("currentTimePlaying");

let player = trackList && trackPlayingId ? new Player(trackList, playerVolume, new Audio(trackList[trackPlayingId].preview)) : new Player();

if(player.isTrackSet()) { player.trackPlaying.currentTime = currentTimePlaying }

if(trackList) player.setOnTrackEnded()

const appSecretKey = 'a5775013018f7dc67e119742b3b471ee';

const initializeAPI = () => {
    DZ.init({
		appId  : appID,
		channelUrl : channelURL
	});

    setEventListeners();
    getStatus();
}

const showLoginWindow = () =>{
    DZ.login(response => {
        response.status == 'connected' ? login(response) : getStatus()
    }, {perms: 'basic_access, email, offline_access'});
}

const login = (data) => {
    DZ.api('/user/me', res => {
        updateUserData(data.userID, res.name, data.authResponse.accessToken, data.status);
    });    
    getChart();   
}

const logout = () => {
    if(confirm("¿Deseas cerrar sesión?")){
        updateUserData(null, null, null, 'not_authorized');
        DZ.logout();
    }
}

const updateUserData = (id, name, token, status) => {  
    let logoutIcon = document.getElementById("logoutIcon");
    let userName = document.getElementById("userName");
    let userUnknownBanner = document.getElementById("userUnknownBanner");  
    let firstResultBanner = document.getElementById("firstResultBanner");
    if(status == 'connected'){
        //Set localStorage items
        localStorage.setItem("userId", id);
        localStorage.setItem("userName",name);
        localStorage.setItem("userToken",token);
        localStorage.setItem("userStatus", status);
        //Hidding/showing banners
        userUnknownBanner.classList.add("is-hidden");
        firstResultBanner.classList.remove("is-hidden");
        //Showing logout icon
        logoutIcon.classList.remove("is-hidden");
        //Setting user name info
        userName.innerHTML = name;
        userName.onclick = null;
        userName.classList.remove("login-hover");  
    }else{
        //Delete localStorage items
        localStorage.clear();
        userUnknownBanner.classList.remove("is-hidden");
        firstResultBanner.classList.add("is-hidden");
        //Hidding logout icon, resetting userName text/click event
        logoutIcon.classList.add("is-hidden");
        userName.innerHTML = "Inicia sesión";
        userName.onclick = () => showLoginWindow();
        userName.classList.add("login-hover");  
        //Cleaning search results        
        const resultsRowOne = document.getElementById("firstRow");
        resultsRowOne.innerHTML = "";
        const resultsRowTwo = document.getElementById("secondRow");
        resultsRowTwo .innerHTML = "";      
    }
    user.id = localStorage.getItem("userId");
    user.name = localStorage.getItem("userName");
    user.accessToken = localStorage.getItem("userToken");
    user.status = localStorage.getItem("userStatus");
}

const getStatus = () => { 
    if(user.status == "connected"){  
        let logoutIcon = document.getElementById("logoutIcon");
        logoutIcon.classList.remove("is-hidden");
        let userName = document.getElementById("userName");
        userName.innerHTML = user.name;
        userName.onclick = null;
        userName.classList.remove("login-hover");  
        let userUnknownBanner = document.getElementById("userUnknownBanner");
        userUnknownBanner.classList.add("is-hidden");  
        let firstResultBanner = document.getElementById("firstResultBanner");
        firstResultBanner.classList.remove("is-hidden");
        if(trackPlayingId){
            let trackTitle = player.tracks[trackPlayingId].title;
            let artistName = player.tracks[trackPlayingId].artist;
            let album = player.tracks[trackPlayingId].album;
            setPlayerInfo(trackTitle, artistName, album);
        }
        getChart();   
    }else{
        alert("Debe identificarse con Deezer para usar Foxbel Music");
    }
}

const getChart = () => {
    const queryTopChart = '/chart/0/tracks?index=0&limit=11';
    DZ.api(queryTopChart, 'GET', res  => {
        const data = res.data;
        const firstResult = data[0];
        //Mejor coincidencia
        const album = document.getElementById("albumTitle");
        album.innerHTML = `${firstResult.title} - Albúm: ${firstResult.album.title}`;
        const artist = document.getElementById("artist");
        artist.innerHTML = `${firstResult.artist.name}`;
        const cover = document.getElementById("firstResultCover");
        cover.src = firstResult.album.cover;
        const firstResultIcon = document.getElementById("firstResultPlayIcon");
        firstResultIcon.setAttribute('data', JSON.stringify(firstResult));
        firstResultIcon.onclick = () => setTrack(firstResultIcon)
        data.shift();
        //Resultados
        const resultsRowOne = document.getElementById("firstRow");
        resultsRowOne.innerHTML = "";
        const resultsRowTwo = document.getElementById("secondRow");
        resultsRowTwo .innerHTML = "";
        data.map((record, index) => {
            index < 5 ? addToRow(resultsRowOne, record) : addToRow(resultsRowTwo, record)
        })
    });
}

const addToRow = (row, record) => {
    let container = document.createElement("div");
    container.classList.add("result-container");
    let albumContainer = document.createElement("div");
    albumContainer.classList.add("album-container");
    let img = document.createElement("img");
    img.src = record.album.cover;
    let newRecord = document.createElement("i");
    newRecord.innerHTML = 'play_arrow';
    newRecord.classList.add("track-play");
    newRecord.classList.add("icon");
    newRecord.classList.add("material-icons");
    newRecord.setAttribute("data", JSON.stringify(record));
    newRecord.onclick = () => setTrack(newRecord);
    albumContainer.appendChild(img);
    albumContainer.appendChild(newRecord);
    let title = document.createElement("p");
    title.innerHTML = record.title;
    let artist = document.createElement("p");
    artist.innerHTML = record.artist.name;
    container.appendChild(albumContainer);
    container.appendChild(title);
    container.appendChild(artist);
    row.appendChild(container);
}

const setTrack = (element) => {
    if(player.trackPlaying) player.trackPlaying.pause(); 
    let tracks = document.querySelectorAll('.track-play');
    tracks.forEach(track => {
        track.innerHTML = 'play_arrow';
        track.onclick = () => setTrack(track);
    })
    player.setTracks([]);
    const data = JSON.parse(element.getAttribute('data'));

    if(data.preview != player.trackPlaying.src){
        if(data.tracks){
            alert("it's an album");
        }else{
            const newTrack = new Track(data.artist.name, data.title, data.preview, data.album.cover, data.album.title);        
            player.tracks.push(newTrack);
            player.trackPlaying = new Audio(newTrack.preview);  
            player.trackPlaying.addEventListener('ended', () => {
                player.trackPlaying.currentTime = 0;
                player.pause(element);
            });
            setPlayerInfo(newTrack.title, newTrack.artist, newTrack.album);
        }

        localStorage.setItem("currentTimePlaying", 0);
        localStorage.setItem("trackPlayingId", 0);
        localStorage.setItem("trackList", JSON.stringify(player.tracks));
        localStorage.setItem("volumePlayer", player.volume);
    }
    
    player.resume();
}

const setEventListeners = () => {
    let playerHTML = document.getElementById("iconPlayerPlay");
    playerHTML.onclick = () => player.resume()
    let userName = document.getElementById("userName");
    userName.onclick = () => showLoginWindow()
    let logoutIcon = document.getElementById("logoutIcon");
    logoutIcon.onclick = () => logout()
    let volumeHTML = document.getElementById("volume");
    volumeHTML.oninput = () => player.setVolume(volumeHTML)
}

const setPlayerInfo = (trackTitle, artistName, album) => {
    document.getElementById("playerAlbum").src = album;
    document.getElementById("playerTitle").innerHTML = trackTitle;
    document.getElementById("playerArtist").innerHTML = artistName;
    let volumeHTML = document.getElementById("volume");
    volumeHTML.value = player.volume;
    player.setVolume(volumeHTML);
}

const updateElementIcon = (element, setPause = undefined) => {
    element.innerHTML = setPause ? 'pause' : 'play_arrow';
    element.onclick = () => setPause ? player.pause(element) : setTrack(element);
}

const updatePlayIcons = (setPause = undefined) => {
    let tracks = document.querySelectorAll('.track-play');
    tracks.forEach(track => {
        const data = JSON.parse(track.getAttribute('data'));
        if(data.preview == player.trackPlaying.src){
            track.innerHTML = setPause ? 'pause': 'play_arrow';
            track.onclick = () => setPause ? player.pause(track) : player.resume();
        }
    });
}

export {initializeAPI, updateElementIcon, updatePlayIcons};