const appID = '489402';
const channelURL = 'http://localhost/foxbel-music/dist/channel.html';
let user = {
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    accessToken: localStorage.getItem("userToken"),
    status: localStorage.getItem("userStatus")
};

const appSecretKey = 'a5775013018f7dc67e119742b3b471ee';

const initializeAPI = () => {
    DZ.init({
		appId  : appID,
		channelUrl : channelURL
	});
    getStatus();
}

const getStatus = () => { 
    if(user.status == "connected"){  
        let logoutIcon = document.getElementById("logoutIcon");
        logoutIcon.classList.remove("is-hidden");
        let userName = document.getElementById("userName");
        userName.innerHTML = user.name;
        userName.onclick = null;
        userName.classList.remove("login-hover");  
        let userUnknownBanner = document.getElementById("user-unknown-banner");
        userUnknownBanner.classList.add("is-hidden");  
        let firstResultBanner = document.getElementById("first-result-banner");
        firstResultBanner.classList.remove("is-hidden");
        getChart();   
    }else{
        alert("Debe identificarse con Deezer para usar Foxbel Music");
    }
}

const logout = () => {
    if(confirm("¿Deseas cerrar sesión?")){
        updateUserData(null, null, null, 'not_authorized');
        DZ.logout();
    }
}

const showLogin = () =>{
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

const updateUserData = (id, name, token, status) => {  
    let logoutIcon = document.getElementById("logoutIcon");
    let userName = document.getElementById("userName");
    let userUnknownBanner = document.getElementById("user-unknown-banner");  
    let firstResultBanner = document.getElementById("first-result-banner");
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
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userStatus");
        //Hidding/showing banners
        userUnknownBanner.classList.remove("is-hidden");
        firstResultBanner.classList.add("is-hidden");
        //Hidding logout icon, resetting userName text/click event
        logoutIcon.classList.add("is-hidden");
        userName.innerHTML = "Inicia sesión";
        userName.onclick = () => showLogin();
        userName.classList.add("login-hover");  
        //Cleaning search results        
        const resultsRowOne = document.getElementById("first-row");
        resultsRowOne.innerHTML = "";
        const resultsRowTwo = document.getElementById("second-row");
        resultsRowTwo .innerHTML = "";      
    }
    user.id = localStorage.getItem("userId");
    user.name = localStorage.getItem("userName");
    user.accessToken = localStorage.getItem("userToken");
    user.status = localStorage.getItem("userStatus");
}

const getChart = () => {
    DZ.api('/chart/2/tracks?index=0&limit=11', 'GET', res  => {
        const data = res.data;
        //Mejor coincidencia
        const album = document.getElementById("album-title");
        const artist = document.getElementById("artist");
        const followers = document.getElementById("followers");
        const cover = document.getElementById("first-result-cover");
        album.innerHTML = `${data[0].title} - Albúm: ${data[0].album.title}`;
        artist.innerHTML = `${data[0].artist.name}`;
        cover.src = data[0].album.cover;
        data.shift();
        //Resultados
        const resultsRowOne = document.getElementById("first-row");
        resultsRowOne.innerHTML = "";
        const resultsRowTwo = document.getElementById("second-row");
        resultsRowTwo .innerHTML = "";
        data.map((song, index) => {
            index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song)
        })
    });
}



const addToRow = (row, song) => {
    return row.innerHTML += `<div class="result-container">
                <div class="result-album-container">
                        <img src="${song.album.cover}"/>
                        <i class="icon material-icons">play_arrow</i>
                    </div>
                    <p class="result-album-title">${song.title}</p>
                    <p class="result-album-artist">${song.artist.name}</p>
                </div>`
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
   searchSongs('/search?q='+search.value);
    }

});


////Menu buttoms
document.querySelector('#li-artists').addEventListener("click",()=>{
searchArtistsUser();
});
document.querySelector('#li-albums').addEventListener("click",()=>{
searchAlbumsUser();
});
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
        rowSearchManagement(data,divMainResults,addToRow,"results");
    });
}

function rowSearchManagement(data,mainDiv,RowFunction,kind) {
 CreateRows(data.length,mainDiv,kind);
           var rowNumber=1;
           var rowCounter=0;
        var resultsRow = document.getElementById(rowNumber+"-"+kind+"-row");
        resultsRow.innerHTML= "";
        data.map((object, index) => {
            rowCounter++;
            if(rowCounter!=6){  
             RowFunction(resultsRow,object);
            }else{
             rowCounter=0;
             rowNumber++;
             resultsRow = document.getElementById(rowNumber+"-"+kind+"-row");
            }
        })
}


function mainSearch(data){
 const album = document.getElementById("album-title");
 const artist = document.getElementById("artist");
 const followers = document.getElementById("followers");
 const cover = document.getElementById("first-result-cover");
 album.innerHTML = `${data[0].title} - Albúm: ${data[0].album.title}`;
 artist.innerHTML = `${data[0].artist.name}`;
 cover.src = data[0].album.cover;   
}

const CreateRows = (length,resultsDiv,kind) =>{
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


export {initializeAPI, showLogin, logout};