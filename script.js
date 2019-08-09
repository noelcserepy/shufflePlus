const authBaseUrl = "https://accounts.spotify.com/authorize";
const userBaseUrl = "https://api.spotify.com/v1/me";
const playlistBaseUrl = "https://api.spotify.com/v1/users/";
const trackBaseUrl = "https://api.spotify.com/v1/playlists/";
const featuresBaseUrl = "https://api.spotify.com/v1/audio-features"


// ADD PLAYLIST AND TRACKS
// =======================
function addTracks(sessionData) {
    const uris = [];
    for (let i of sessionData.sortedTracks) {
        uris.push(i[0]);
    }

    console.log("URIs: " + uris.length);

    const bodyOptions = {uris} 

    const addTracksOptions = {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + sessionData.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyOptions),
    };

    console.log(JSON.stringify(addTracksOptions));

    const addTracksUrl = trackBaseUrl + sessionData.newPlaylist.id + "/tracks";

    fetchJson(addTracksUrl, addTracksOptions)
        .then(responseJson => console.log("Tracks added"))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })

    getPlaylists(sessionData);
}



function addPlaylist(sessionData) {
    console.log("Adding playlist...");

    const bodyOptions = {
        name: sessionData.currentPlaylist.name + " - " + sessionData.currentAlgo,
        description: `Created by shufflePlus. ${sessionData.currentAlgo}`,
    };

    const addPlaylistOptions = {
        method: "POST",
        headers: {
            'Authorization': sessionData.options.headers.Authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyOptions),
    };

    const addPlaylistUrl = playlistBaseUrl + sessionData.user.id + "/playlists";

    fetchJson(addPlaylistUrl, addPlaylistOptions)
        .then(responseJson => sessionData.newPlaylist = responseJson)
        .then(responseJson => addTracks(sessionData))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })
}


// SORTING ALGOS
// ==============

//ENERGY

function getRealEnergy(sessionData) {
    let sortingTracks = [];
    for (let i of sessionData.trackFeatures.audio_features) {
        if (i.energy === null) {continue; }
        const energy = i.energy;
        const danceability = i.danceability;
        let tempo = i.tempo;
        if (tempo < 50) {tempo = 50};
        if (tempo > 180) {tempo = 180};
        tempo = (tempo - 50) / 130;
        let loudness = i.loudness;
        if (loudness < -60) {loudness = -60};
        if (loudness > 0) {loudness = 0};
        loudness = (loudness / 60) + 1;

        const realEnergy = (0.5 * energy) + (0.15 * tempo) + (0.1 * loudness) + (0.25 * danceability);

        let trackI = [i.uri, realEnergy]
        sortingTracks.push(trackI);
    }
    return sortingTracks
}

function energyUp(sessionData) {
    const sortingTracks = getRealEnergy(sessionData);
    sortingTracks.sort(function(a, b) {
        return a[1] - b[1]
    });
    
    return sortingTracks
}

function energyDown(sessionData) {
    const sortingTracks = getRealEnergy(sessionData);
    sortingTracks.sort(function(a, b) {
        return b[1] - a[1]
    });
    
    return sortingTracks
}

// POSITIVITY

function getRealPositivity(sessionData) {
    let sortingTracks = [];
    for (let i of sessionData.trackFeatures.audio_features) {
        if (i.energy === null) {continue; }
        const valence = i.valence;
        const mode = i.mode;

        const realPositivity = (0.8 * valence) + (0.2 * mode);
        let trackI = [i.uri, realPositivity]
        sortingTracks.push(trackI);
    }

    return sortingTracks
}

function positivityUp(sessionData) {
    const sortingTracks = getRealPositivity(sessionData);
    sortingTracks.sort(function(a, b) {
        return a[1] - b[1]
    });
    
    return sortingTracks
}

function positivityDown(sessionData) {
    const sortingTracks = getRealPositivity
    sortingTracks.sort(function(a, b) {
        return b[1] - a[1]
    });
    
    return sortingTracks
}

// GIG

function getRealGig(sessionData) {
    let sortingTracks = [];
    for (let i of sessionData.trackFeatures.audio_features) {
        if (i.energy === null) {continue; }
        const speechiness = i.speechiness;
        const acousticness = i.acousticness;
        const liveness = i.liveness;
        const instrumentalness = i.instrumentalness;

        const realGig = (0.1 * speechiness) + (0.4 * acousticness) + (0.3 * liveness) + (0.2 * instrumentalness);
        let trackI = [i.uri, realGig]
        sortingTracks.push(trackI);
    }

    return sortingTracks
}

function gigUp(sessionData) {
    const sortingTracks = getRealGig(sessionData);    
    sortingTracks.sort(function(a, b) {
        return a[1] - b[1]
    });
    
    return sortingTracks
}

function gigDown(sessionData) {
    const sortingTracks = getRealGig(sessionData);
    sortingTracks.sort(function(a, b) {
        return b[1] - a[1]
    });
    
    return sortingTracks
}

// ALGO SWITCH

function sortTracks(sessionData) {
    console.log("Sorting tracks...");
    console.log("Track Features: " + sessionData.trackFeatures.audio_features.length);
    let sortedTracks = []

    if (sessionData.currentAlgo === "energy-up") {
        sortedTracks = energyUp(sessionData);
    }else if (sessionData.currentAlgo === "energy-down") {
        sortedTracks = energyDown(sessionData);
    }else if (sessionData.currentAlgo === "positivity-up") {
        sortedTracks = positivityUp(sessionData);
    }else if (sessionData.currentAlgo === "positivity-down") {
        sortedTracks = positivityDown(sessionData);
    }else if (sessionData.currentAlgo === "gig-up") {
        sortedTracks = gigUp(sessionData);
    }else if (sessionData.currentAlgo === "gig-down") {
        sortedTracks = gigDown(sessionData);
    }

    console.log("Sorted tracks: " + sortedTracks.length);
    sessionData.sortedTracks = sortedTracks;
    addPlaylist(sessionData);
}


// GET TRACKS AND FEATURES
// =======================
function getFeatures(sessionData) {
    console.log("Getting track features...");
    const trackIds = [];

    for (let i of sessionData.tracks.items) {
        trackIds.push(i.track.id);
    }

    const params = {
        ids: trackIds.toString(),
    }

    const featuresUrl = featuresBaseUrl + "?" + $.param(params);

    console.log("trackIds are: " + trackIds.length);

    fetchJson(featuresUrl, sessionData.options)
        .then(responseJson => sessionData.trackFeatures = responseJson)
        .then(responseJson => sortTracks(sessionData))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })

}


function getTracks(sessionData) {
    console.log("Getting tracks...");
    const trackUrl = trackBaseUrl + sessionData.currentPlaylist.id + "/tracks";
    console.log(`trackUrl is: ${trackUrl}`);
    fetchJson(trackUrl, sessionData.options)
            .then(responseJson => sessionData.tracks = responseJson)
            .then(responseJson => getFeatures(sessionData))
            .catch(error => {
                alert(`Something went wrong with tracks: ${error.message}`);
            })
}


// HANDLE PLAYLIST CLICKS
// ======================
function handleAlgoClicks(sessionData) {
    console.log("Listening for algo clicks...");
    $(".playlist .algo-buttons li").click(function(event) {
        event.preventDefault();

        const clickedPlaylistId = $(this).parents(".playlist").attr("data-id");
        const currentPlaylist = sessionData.playlists.items.find(item => item.id === clickedPlaylistId);
        sessionData.currentPlaylist = currentPlaylist;

        if ($(this).attr("class") === "energy-up") {
            sessionData.currentAlgo = "energy-up";
        } else if ($(this).attr("class") === "energy-down") {
            sessionData.currentAlgo = "energy-down";
        } else if ($(this).attr("class") === "positivity-up") {
            sessionData.currentAlgo = "positivity-up";
        } else if ($(this).attr("class") === "positivity-down") {
            sessionData.currentAlgo = "positivity-down";
        } else if ($(this).attr("class") === "gig-up") {
            sessionData.currentAlgo = "gig-up";
        } else if ($(this).attr("class") === "gig-down") {
            sessionData.currentAlgo = "gig-down";
        } 

        getTracks(sessionData);
    });
}


function handlePlaylistClicks() {
    console.log("Listening for playlist clicks...");
    $(".accordeon-head").click(function(event) {
        event.preventDefault();
        $(".playlist .algo-buttons").slideUp("normal");
        $(this).parent().find(".algo-buttons").slideToggle("normal");
    });
}


// SHOW PLAYLISTS
// ==============
function loadMain(sessionData) {
    console.log("Loading main...")
    console.log("loadMain received playlists: " + JSON.stringify(sessionData.playlists.items.length));

    $("header").addClass("hidden");
    
    $("main").empty();
    $("main").append(`
        <div class="playlist-holder">
            <h2>Choose one of your playlists to sort:</h2>
            <ul class="playlist-list">
            </ul>
        </div>`);
    
    for (let i of sessionData.playlists.items) {
        console.log(JSON.stringify(i.name));
        $(".playlist-list").append(`
            <li class="playlist" data-id="${i.id}">
                <div class="accordeon-head">
                    <a href="#">${i.name}</a>
                </div>
                <ul class="algo-buttons">
                    <li class="energy-up">Increasing energy</li>
                    <li class="energy-down">Decreasing energy</li>
                    <li class="positivity-up">Increasing positivity</li>
                    <li class="positivity-down">Decreasing positivity</li>
                    <li class="gig-up">Increasing gig</li>
                    <li class="gig-down">Decreasing gig</li>
                </ul>
            </li>`);

        if (i.images[0]) {
            $(`.playlist[data-id=${i.id}]`).find(".accordeon-head").prepend(`
                <img class="playlist-image" data-id="${i.id}" src="${i.images[0].url}"></img>`);
        } else {
            $(`.playlist[data-id=${i.id}]`).find(".accordeon-head").prepend(`
                <img class="playlist-image" data-id="${i.id}" src="media/spotify.png"></img>`);
        }

        $(`.playlist[data-id=${i.id}]`).find(".algo-buttons").hide();
    }
    handlePlaylistClicks();
    handleAlgoClicks(sessionData);
}


function getPlaylists(sessionData) {
    console.log("getPlaylists started " + typeof sessionData);
    console.log(sessionData);
    console.log("User ID: " + sessionData.user.id);

    const params = {
        limit: 50,
    }
    
    const playlistUrl = playlistBaseUrl + sessionData.user.id + "/playlists" + "?" + $.param(params);
    console.log(`playlistUrl is : ${playlistUrl}`);

    fetchJson(playlistUrl, sessionData.options)
        .then(responseJson => sessionData.playlists = responseJson)
        .then(responseJson => loadMain(sessionData))
        .catch(error => {
            alert(`Something went wrong with playlists: ${error.message}`);
        })
}


function fetchJson(url, options) {
    return fetch(url, options)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
}


function getUser(token) {
    const options = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };

    sessionData = {
        token: token,
        options: options
    }

    fetchJson(userBaseUrl, options)
        .then(responseJson => sessionData.user = responseJson)
        .then(responseJson => getPlaylists(sessionData))
        .catch(error => {
            alert(`Something went wrong with user: ${error.message}`);
        })
}


// AUTH
// ====
function receiveAuthToken() {
    if (!window.location.hash) {
        return false
    }
    const tokenSlices = window.location.hash.split(/[=&]/);
    return tokenSlices[1]
}


function handleAuth() {
    let token = receiveAuthToken();
    console.log(`Token: ${token}`);
    if (!token) {
        console.log("ask for token");
    } else {
        console.log("show rest of app");
        getUser(token);
    }
}


function getToken() {
    const authParams = {
        client_id: "5e45e12ee8954ec591c64d49dbb8adc4",
        response_type: "token",
        redirect_uri: "https://noelcserepy.github.io/shufflePlus/", // http://localhost:8000/
        scope: "playlist-modify-public playlist-modify-private playlist-read-collaborative user-library-modify user-library-read user-follow-read user-follow-modify"
    }

    const authUrl = authBaseUrl + "?" + $.param(authParams);

    console.log(authUrl);
    window.open(authUrl, "_self");
}


function handleClicks() {
    $("button").click(event => {
        event.preventDefault();
        getToken();
    });
}


$(function() {
    console.log("App ready!");
    handleClicks();
    handleAuth();
})