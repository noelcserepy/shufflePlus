const authBaseUrl = "https://accounts.spotify.com/authorize";
const userBaseUrl = "https://api.spotify.com/v1/me";
const playlistBaseUrl = "https://api.spotify.com/v1/users/";




function loadMain(token, user, options, playlists) {
    console.log("Loading main...")

    console.log("loadMain received user: " + JSON.stringify(user));
    console.log("loadMain received playlists: " + JSON.stringify(playlists));

    $("main").append(`
        <div class="playlist-holder">
            <h2>Choose one of your playlists to sort:</h2>
            <ul class="playlist-list">
            </ul>
        </div>`);
    
    for (let i of playlists.items) {
        $(".playlist-list").append(`
            <li class="playlist" data-id="${i.id}">
                <p>${i.name}</p>
                <img src="${i.images[0].url}">
            `);
        
    }
    
}





function getPlaylists(token, user, options) {
    console.log("User ID: " + user.id);

    const params = {
        limit: 50,
    }
    const playlistUrl = playlistBaseUrl + user.id + "/playlists" + "?" + formatUrl(params)


    return fetch(playlistUrl, options)
    .then(response => {
        console.log(response)
        if (response.ok) {
        return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => loadMain(token, user, options, responseJson))
    .catch(error => {
        alert(`Something went wrong: ${error.message}`);
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
        .then(responseJson => getPlaylists(token, responseJson, options))
        .catch(error => {
            alert(`Something went wrong: ${error.message}`);
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
        redirect_uri: "http://localhost:8000/",/* "file:///C:/Users/noelc/projects/shufflePlus/index.html", */ 
    }

    const authUrl = authBaseUrl + "?" + formatUrl(authParams);

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