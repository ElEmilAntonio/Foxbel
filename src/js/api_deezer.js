const appID = '489402';
const appSecretKey = 'a5775013018f7dc67e119742b3b471ee';
let accessToken = 'frCpv4T49lhSmMVBQWL76pbq38M99gWEy7w99euk80rgU4MVw7';
const channelURL = 'http://localhost/foxbel-music/dist/channel.html';

const initializeAPI = () => {
    DZ.init({
		appId  : appID,
		channelUrl : channelURL
	});
    getStatus();
}

const getStatus = () => {
    DZ.getLoginStatus(res => {
        res.status == 'connected' ? setUserInfo() : alert(res.status);
    });
}

const showLogin = () =>{
    DZ.login(response => {
        response.status == 'connected' ? setUserInfo() : getStatus()
    }, {perms: 'basic_access, email, offline_access'});
}

const setUserInfo = () => {
    DZ.api('/user/me', res => {
        let userName = document.getElementById("userName");
        userName.innerHTML = res.name;
    });    
    getChart();   
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
        const resultsRowTwo = document.getElementById("second-row");
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



export {initializeAPI, showLogin};