const authBaseUrl = "https://accounts.spotify.com/authorize";
const userBaseUrl = "https://api.spotify.com/v1/me";
const playlistBaseUrl = "https://api.spotify.com/v1/users/";
const trackBaseUrl = "https://api.spotify.com/v1/playlists/";
const featuresBaseUrl = "https://api.spotify.com/v1/audio-features"


function addTracks(options, sortedTracks, user, newPlaylist) {
    const uris = [];
    for (let i of sortedTracks) {
        uris.push(i[0]);
    }

    console.log(uris);

    const bodyOptions = {
        uris: uris,
    }

    const addTracksOptions = {
        method: "POST",
        headers: {
            'Authorization': options.headers.Authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyOptions),
    };

    console.log(JSON.stringify(addTracksOptions));

    const addTracksUrl = trackBaseUrl + newPlaylist.id + "/tracks";

    return fetch(addTracksUrl, addTracksOptions)
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log("Playlist created");
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log("added tracks: " + responseJson))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })


}



function addPlaylist(options, sortedTracks, user) {
    console.log("Adding playlist...");

    const bodyOptions = {
        name: "Shuffled",
        description: "Created by shufflePlus. Increasing energy",
    };

    const addPlaylistOptions = {
        method: "POST",
        headers: {
            'Authorization': options.headers.Authorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyOptions),
    };

    const addPlaylistUrl = playlistBaseUrl + user.id + "/playlists";

    return fetch(addPlaylistUrl, addPlaylistOptions)
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log("Playlist created");
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => addTracks(options, sortedTracks, user, responseJson))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })
}


function sortTracks(options, trackFeatures, user) {
    console.log("Sorting tracks...");

    const sortedTracks = [];

    for (let i of trackFeatures.audio_features) {
        let trackI = [i.uri, i.energy]
        sortedTracks.push(trackI);
    }

    sortedTracks.sort(function(a, b) {
        return a[1] - b[1]
    });

    console.log(sortedTracks);

    addPlaylist(options, sortedTracks, user);
}


function getFeatures(options, tracks, user) {
    console.log("Getting track features...");
    console.log(JSON.stringify(tracks));

    const trackIds = [];

    for (let i of tracks.items) {
        trackIds.push(i.track.id);
    }

    const params = {
        ids: trackIds,
    }

    const featuresUrl = featuresBaseUrl + "?" + formatUrl(params);


    return fetch(featuresUrl, options)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => sortTracks(options, responseJson, user))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })

}



function handlePlaylistClicks(options, user) {
    console.log("Getting tracklist...");
    $(".playlist").click(function(event) {
        event.preventDefault();
        
        const trackUrl = trackBaseUrl + $(this).attr("data-id") + "/tracks";

        console.log(`trackUrl is: ${trackUrl}`);

        return fetch(trackUrl, options)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => getFeatures(options, responseJson, user))
        .catch(error => {
            alert(`Something went wrong with tracks: ${error.message}`);
        })


    })
}



function loadMain(options, playlists, user) {
    console.log("Loading main...")
    console.log("loadMain received playlists: " + JSON.stringify(playlists));

    $("header").addClass("hidden");

    $("main").append(`
        <div class="playlist-holder">
            <h2>Choose one of your playlists to sort:</h2>
            <ul class="playlist-list">
            </ul>
        </div>`);
    
    for (let i of playlists.items) {
        console.log(JSON.stringify(i));
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
    handlePlaylistClicks(options, user);
    
}





function getPlaylists(user, options) {
    console.log("User ID: " + user.id);

    const params = {
        limit: 50,
    }
    const playlistUrl = playlistBaseUrl + user.id + "/playlists" + "?" + formatUrl(params);
    console.log(`playlistUrl is : ${playlistUrl}`);

    return fetch(playlistUrl, options)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => loadMain(options, responseJson, user))
        .catch(error => {
            alert(`Something went wrong with playlists: ${error.message}`);
        })

}






function getUser(token) {
    const options = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };


    return fetch(userBaseUrl, options)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => getPlaylists(responseJson, options))
        .catch(error => {
            alert(`Something went wrong with user: ${error.message}`);
        })
}










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









function formatUrl(params) {
    const paramItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return paramItems.join("&");
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