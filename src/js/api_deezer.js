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

if(player.isTrackSet()) { player.setCurrentTime(currentTimePlaying) }

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
    DZ.api('/'+user.id+'/me', res => {
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
        firstResultIcon.onclick = () => setTrack(firstResultIcon);
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




/////CODIGUIN EMIL//////
////CODIGUIN EMIL//////
window.addEventListener('load',()=>{
var search = document.querySelector('#buscador');
var recomendaciones = document.querySelector('#recomendaciones');
var divMainResults = document.querySelector('#div-main-results');
var divMainAlbums = document.querySelector('#div-main-albums');
var divMainArtists = document.querySelector('#div-main-artists');
search.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        searchSongs('/search?q='+search.value+'&limit=12');
    }
});


////Menu buttoms
document.querySelector('#li-artists').addEventListener("click",()=> searchArtistsUser() );
document.querySelector('#li-albums').addEventListener("click",()=> searchAlbumsUser() );

///Functions User
function searchAlbumsUser(){
    hiddeResultsdivs();
    divMainAlbums.classList.remove("is-hidden");
    DZ.api('/user/'+user.id+'/albums','GET', function(response){
        const data = response.data;
        rowSearchManagement(data,divMainAlbums,addAlbumsToRow,"albums");
    });
}

function searchArtistsUser(){
hiddeResultsdivs();
    divMainArtists.classList.remove("is-hidden");
DZ.api('/user/'+user.id+'/artists','GET', function(response){
  const data = response.data;
    rowSearchManagement(data,divMainArtists,addArtistToRow,"artists");
    });
}

function searchSongs(search){
    hiddeResultsdivs();
    divMainResults.classList.remove("is-hidden");
    DZ.api(search, 'GET', res  => {
        const data = res.data;
        mainSearch(data);
        data.shift();
        rowSearchManagement(data,divMainResults,addToRow,"results");
    });
}

function rowSearchManagement(data,mainDiv,addToRow,kind) {
    createRows(data.length,mainDiv,kind);
    var rowNumber=1;
    var rowCounter=0;
    var resultsRow = document.getElementById(rowNumber+"-"+kind+"-row");
    resultsRow.innerHTML= "";
    data.map(object => {
        rowCounter++;
        if(rowCounter != 6){  
            addToRow(resultsRow,object);
        }else{
            rowCounter=0;
            rowNumber++;
            resultsRow = document.getElementById(rowNumber+"-"+kind+"-row");
            resultsRow.innerHTML= "";
        }
    });
}


function mainSearch(data){
 const album = document.getElementById("albumTitle");
 const artist = document.getElementById("artist");
 const followers = document.getElementById("followers");
 const cover = document.getElementById("firstResultCover");
 album.innerHTML = `${data[0].title} - Albúm: ${data[0].album.title}`;
 artist.innerHTML = `${data[0].artist.name}`;
 cover.src = data[0].album.cover;   
 const firstResultIcon = document.getElementById("firstResultPlayIcon");
 firstResultIcon.setAttribute('data', JSON.stringify(data[0]));
 firstResultIcon.onclick = () => setTrack(firstResultIcon);
}

const createRows = (length,resultsDiv,kind) =>{
    var rowNumber=1;
    addRow(resultsDiv,rowNumber,kind);
    for (var i =0; i<=length; i++) {
        if(i%5==0){
            rowNumber++;
            addRow(resultsDiv,rowNumber,kind);
        }
    }
}

const addRow = (div,number,kind) => {
    return div.innerHTML += `
            <div id="${number}-${kind}-row" class="row">
            </div>`
}

const addArtistToRow = (row,artist) =>{
 return row.innerHTML += `<div class="result-container">
                <div class="result-album-container">
                        <img src="${artist.picture}"/>
                    </div>
                     <p class="result-album-title">${artist.name}</p>
                    <p class="result-album-title">N° Fans: ${artist.nb_fan}</p>
                </div>`
}

const addAlbumsToRow = (row,album) =>{
 return row.innerHTML += `<div class="result-container">
                <div class="result-album-container">
                        <img src="${album.cover}"/>
                    </div>
                     <p class="result-album-title">${album.title}</p>
                    <p class="result-album-title">N° Fans: ${album.artist.name}</p>
                </div>`   
}

});
/// css Functions

function hiddeResultsdivs(){
    var resultDivs = document.getElementsByClassName('results-container');
    for (let i = 0; i < resultDivs.length; i++) {resultDivs[i].classList.add("is-hidden");}
}


export {initializeAPI, updateElementIcon, updatePlayIcons};
