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
        let userName = document.getElementById("userName");
        logoutIcon.classList.remove("is-hidden");
        userName.innerHTML = user.name;
        userName.onclick = null;
        userName.classList.remove("login-hover");      
        getChart();   
    }else{
        alert("Debe identificarse con Deezer para usar Foxbel Music");
    }
    /*
    DZ.getLoginStatus(res => {
        res.status == 'connected' ? setUserInfo() : alert(res.status);
    });
    */
}

const logout = () => {
    if(confirm("Deseas cerrar sesión?")){
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
    DZ.api('/user/me', res => {
        updateUserData(data.userID, res.name, data.authResponse.accessToken, data.status);
    });    
    getChart();   
}

const updateUserData = (id, name, token, status) => {  
    let logoutIcon = document.getElementById("logoutIcon");
    let userName = document.getElementById("userName");
    if(status == 'connected'){
        localStorage.setItem("userId", id);
        localStorage.setItem("userName",name);
        localStorage.setItem("userToken",token);
        localStorage.setItem("userStatus", status);
        logoutIcon.classList.remove("is-hidden");
        userName.innerHTML = name;
        userName.onclick = null;
        userName.classList.remove("login-hover");
    }else{
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userStatus");
        logoutIcon.classList.add("is-hidden");
        userName.innerHTML = "Inicia sesión";
        userName.onclick = () => showLogin();
        userName.classList.add("login-hover");        
    }
    user.id = localStorage.getItem("userId");
    user.name = localStorage.getItem("userName");
    user.accessToken = localStorage.getItem("userToken");
    user.status = localStorage.getItem("userStatus");
}

const getChart = () => {
    DZ.api('/chart/0/tracks?index=0&limit=11', 'GET', res  => {
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

/*
const getMainData = () => {
    const options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
        },
        mode: 'cors',
    }
    fetch(`https://api.deezer.com/chart/0/tracks?index=0&limit=11`, options)
    .then(res => res.json())
    .then(res => {
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
        const resultsRowTwo = document.getElementById("second-row");
        data.map((song, index) => {
            index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song)
        })
    })
    .catch(error => {
        const access_token = window.location.hash;
    })
}
*/

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



export {initializeAPI, showLogin, logout};