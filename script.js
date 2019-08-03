const authBaseUrl = "https://accounts.spotify.com/authorize";
const userBaseUrl = "https://api.spotify.com/v1/me";
const playlistBaseUrl = "https://api.spotify.com/v1/users/";
const trackBaseUrl = "https://api.spotify.com/v1/playlists/";
const featuresBaseUrl = "https://api.spotify.com/v1/audio-features"


// CLICK PLAYLIST

function addTracks(sessionData) {
    const uris = [];
    for (let i of sessionData.sortedTracks) {
        uris.push(i[0]);
    }

    console.log("URIs: " + uris.length);

    const bodyOptions = {
        uris: uris,
    }

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
        name: sessionData.currentPlaylist.name + " < energy",
        description: "Created by shufflePlus. Increasing energy",
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


function sortTracks(sessionData) {
    console.log("Sorting tracks...");
    console.log("Track Features: " + sessionData.trackFeatures.audio_features.length);
    const sortedTracks = [];

    for (let i of sessionData.trackFeatures.audio_features) {
        let trackI = [i.uri, i.energy]
        sortedTracks.push(trackI);
    }

    sortedTracks.sort(function(a, b) {
        return a[1] - b[1]
    });
    console.log("Sorted tracks: " + sortedTracks.length);

    sessionData.sortedTracks = sortedTracks;
    addPlaylist(sessionData);
}


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


// SHOW PLAYLISTS

function handlePlaylistClicks(sessionData) {
    console.log("Getting tracklist...");
    $(".playlist").click(function(event) {
        event.preventDefault();
        const clickedPlaylistId = $(this).attr("data-id");
        const currentPlaylist = sessionData.playlists.items.find(item => item.id === clickedPlaylistId);
        sessionData.currentPlaylist = currentPlaylist;
        getTracks(sessionData);
    })
}


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
                <h3>${i.name}</h3>
            `);
            if (i.images[0]) {
                $(`.playlist[data-id=${i.id}]`).append(`
                    <img class="playlist-image" data-id="${i.id}" src="${i.images[0].url}"></img>`);
            } else {
                $(`.playlist[data-id=${i.id}]`).append(`
                    <img class="playlist-image" data-id="${i.id}" src="media/spotify.png"></img>`);
            }
    }
    handlePlaylistClicks(sessionData);
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
        redirect_uri: "http://localhost:8000/",
        scope: ["playlist-modify-public", "playlist-modify-private"]
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