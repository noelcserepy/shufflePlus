const authBaseUrl = "https://accounts.spotify.com/authorize";
const userBaseUrl = "https://api.spotify.com/v1/me";
const playlistBaseUrl = "https://api.spotify.com/v1/users/";
const trackBaseUrl = "https://api.spotify.com/v1/playlists/";
const featuresBaseUrl = "https://api.spotify.com/v1/audio-features"


// ADD PLAYLIST AND TRACKS
// =======================
async function addTracks(sessionData) {
    console.log("Adding tracks to playlist...");
    const uris = [];
    //uris.concat(sessionData.localUris);
    for (const i of sessionData.sortedTracks) {
        uris.push(i[0]);
    }

    const addTracksUrl = trackBaseUrl + sessionData.newPlaylist.id + "/tracks";

    console.log("URIs: " + uris.length);

    let trackCollection = undefined;
    try {
        const trackPromises = [];
        for (let i = 0; i < uris.length; i += 100) {
            const bodyOptions = {uris: uris.slice(i, i + 100)}

            const addTracksOptions = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + sessionData.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyOptions),
            }

            trackPromises.push(fetchJson(addTracksUrl, addTracksOptions));
        }

        trackCollection = await Promise.all(trackPromises)
        console.log(trackCollection)
    }catch (error) {
        console.log(`Something went wrong with adding tracks to playlist: ${error.message}`);
    }

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
            alert(`Something went wrong with adding playlist: ${error.message}`);
        })
}


// SORTING ALGOS
// ==============

//ENERGY

function getRealEnergy(sessionData) {
    let sortingTracks = [];
    for (const i of sessionData.trackFeatures.audio_features) {
        if (typeof i.energy === "undefined" || i.energy === null || sessionData.trackFeatures === "undefined") {continue; }
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

        const realEnergy = (0.55 * energy) + (0.15 * tempo) + (0.1 * loudness) + (0.20 * danceability);

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
    for (const i of sessionData.trackFeatures.audio_features) {
        if (typeof i.energy === "undefined" || i.energy === null || sessionData.trackFeatures === "undefined") {continue; }
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
    const sortingTracks = getRealPositivity(sessionData);
    sortingTracks.sort(function(a, b) {
        return b[1] - a[1]
    });
    
    return sortingTracks
}

// GIG

function getRealGig(sessionData) {
    let sortingTracks = [];
    for (const i of sessionData.trackFeatures.audio_features) {
        if (typeof i.energy === "undefined" || i.energy === null || sessionData.trackFeatures === "undefined") {continue; }
        const speechiness = i.speechiness;
        const acousticness = i.acousticness;
        const liveness = i.liveness;
        const instrumentalness = i.instrumentalness;

        const realGig = (0.1 * speechiness) + (0.3 * acousticness) + (0.5 * liveness) + (0.1 * instrumentalness);
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
async function getFeatures(sessionData) {
    console.log("Getting track features...");
    let trackIds = [];
    const localUris = [];

    for (const i of sessionData.tracks.items) {
        if (i.track.is_local === true) {
            localUris.push(i.track.uri);
        }else {
            trackIds.push(i.track.id);
        }
    }

    sessionData.localUris = localUris;

    let featureCollection = undefined;
    try {
        const trackPromises = [];
        for (let i = 0; i < trackIds.length; i += 100) {
            const params = {
                ids: trackIds.slice(i, i + 100).toString(),
            }

            const featuresUrl = featuresBaseUrl + "?" + $.param(params);

            trackPromises.push(fetchJson(featuresUrl, sessionData.options))
        }

        featureCollection = await Promise.all(trackPromises)
    }catch (error) {
        console.log(`Something went wrong with features: ${error.message}`);
    }

    if (typeof sessionData.trackFeatures !== "undefined") {
        delete sessionData.trackFeatures;
    }

    for (const i of featureCollection) {
        if (typeof sessionData.trackFeatures === "undefined") {
            sessionData.trackFeatures = i;
        }else {
            sessionData.trackFeatures = {
                audio_features: [...sessionData.trackFeatures.audio_features, ...i.audio_features],
            }
        }
    }

    sortTracks(sessionData);
}


async function getTracks(sessionData) {
    console.log("Getting tracks...");
    let trackUrl = trackBaseUrl + sessionData.currentPlaylist.id + "/tracks";
    sessionData = await getStuff(sessionData, "tracks", trackUrl);
    getFeatures(sessionData);
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
        $(this).parent().find(".algo-buttons").slideToggle("normal");
    });
}


// SHOW PLAYLISTS
// ==============
function playlistAdded(id) {
    $(id).find(".accordeon-head p").show();
    $(id).find(".accordeon-head p").delay(3000).fadeOut("slow");
}

function scrollToCurrent(sessionData) {
    var id = "#" + sessionData.currentPlaylist.id
    var offset = 60;
    var target = $(id).offset() - 5;
    $(id).find(".algo-buttons").slideDown("normal");
    $("html, body").animate({scrollTop : target.top}, 500);
    playlistAdded(id);
}

function loadMain(sessionData) {
    console.log("Loading main...")

    $("header").addClass("hidden");
    
    $("main").empty();
    $("main").append(`
        <h2>Sort by:</h2>
        <div class="description-holder">
            <div class="energy algo-description">
                <div class="algo-image">
                    <object data="media/plug.svg" type="image/svg+xml"></object>
                </div>
                <h2>Energy</h2>
                <p>How energetic the song is. Noisy, fast and loud tracks tend to have a high energy rating.</p>
            </div>
            <div class="positivity algo-description">
                <div class="algo-image">
                    <object data="media/happy.svg" type="image/svg+xml"></object>
                </div>
                <h2>Positivity</h2>
                <p>A measure of how happy the song sounds. Takes into account the valence and key of the track.</p>
            </div>
            <div class="gig algo-description">
                <div class="algo-image">
                    <object data="media/band.svg" type="image/svg+xml"></object>
                </div>
                <h2>Gig</h2>
                <p>Gig measures how "live" and acoustic the song is. The less gig, the more produced is the track.</p>
            </div>
        </div>
        <div class="playlist-holder">
            <h2>Choose one of your playlists to sort:</h2>
            <ul class="playlist-list">
            </ul>
        </div>`);
    
    for (const i of sessionData.playlists.items) {
        $(".playlist-list").append(`
            <li class="playlist" data-id="${i.id}" id="${i.id}">
                <div class="accordeon-head">
                    <a href="#">${i.name}</a>
                    <div class="pll-added-container">
                        <p>Playlist added</p>
                    </div>
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

        if (typeof sessionData.playlists.items[0] === undefined) {
            $(".playlist-list").append(`
                <p>There seem to be no playlists in your library...</p>
            `)
        }

        if (i.images[0]) {
            console.log("loading images");
            $(`.playlist[data-id=${i.id}]`).find(".accordeon-head").prepend(`
                <img class="playlist-image" data-id="${i.id}" src="${i.images[0].url}"></img>`);
        } else {
            $(`.playlist[data-id=${i.id}]`).find(".accordeon-head").prepend(`
                <img class="playlist-image" data-id="${i.id}" src="media/spotify.png"></img>`);
        }

        $(`.playlist[data-id=${i.id}]`).find(".algo-buttons").hide();
    }

    if ("currentPlaylist" in sessionData) {
        scrollToCurrent(sessionData);
    }

    handlePlaylistClicks();
    handleAlgoClicks(sessionData);
}


async function getStuff(sessionData, child, apiUrl) {
    let keepFetching = true;
    let apiUrlHere = apiUrl;

    if (typeof sessionData[child] !== "undefined") {
        delete sessionData[child];
    }

    while (keepFetching === true) {
        try {
            let responseJson = await fetchJson(apiUrlHere, sessionData.options)
            if (typeof sessionData[child] === "undefined") {
                sessionData[child] = responseJson;
            }else {
                sessionData[child] = {
                    next: responseJson.next,
                    items: [...sessionData[child].items, ...responseJson.items],
                }
            }

            if (responseJson.next === null) {
                keepFetching = false;
                console.log(`done fetching ${child}`);
                return sessionData;
            } else {
                apiUrlHere = responseJson.next;
                continue;
            }
        }catch (error) {
            alert(`Something went wrong with ${child}: ${error.message}`);
        }
    }
}


async function getPlaylists(sessionData) {
    console.log("Getting playlists...");
    const params = {
        limit: 50,
    }

    let playlistUrl = playlistBaseUrl + sessionData.user.id + "/playlists" + "?" + $.param(params);

    sessionData = await getStuff(sessionData, "playlists", playlistUrl);

    loadMain(sessionData);
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
            try {
                getToken();
            }catch {
                console.log(`Something went wrong with user: ${error.message}`);
                alert("Refresh the page to log in again");
            }
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
    if (!token) {
        try {
            receiveAuthToken();
        }catch (error){
            console.log(`Something went wrong with token: ${error.message}`);
        }
    } else {
        getUser(token);
    }
}


function getToken() {
    const authParams = {
        client_id: "5e45e12ee8954ec591c64d49dbb8adc4",
        response_type: "token",
        redirect_uri: "https://noelcserepy.github.io/shufflePlus/",
        //redirect_uri: "http://localhost:8000/",
        scope: "playlist-modify-public playlist-modify-private playlist-read-collaborative user-library-read"
    }

    const authUrl = authBaseUrl + "?" + $.param(authParams);
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