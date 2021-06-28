const getMainData = () => {
    const options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods':'GET',
        }
    };
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks?index=0&limit=11", options)
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
        const resultsRowOne = document.getElementById("first-row");
        const resultsRowTwo = document.getElementById("second-row");
        data.map((song, index) => {
            index < 5 ? addToRow(resultsRowOne, song) : addToRow(resultsRowTwo, song)
        })
    })
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



export {getMainData as getApiData};