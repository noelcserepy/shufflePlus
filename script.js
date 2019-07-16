const authBaseUrl = "https://accounts.spotify.com/authorize?";



function receiveAuthToken() {
    if (!window.location.hash) {
        return false
    }
    return window.location.hash
}

let token = receiveAuthToken();
if (!token) {
    /* ask for login again */
} else {
    /* show rest of app */
}


function formatUrl(params) {
    const paramItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return paramItems.join("&");
}


function getToken() {
    const params = {
        client_id: "5e45e12ee8954ec591c64d49dbb8adc4",
        response_type: "token",
        redirect_uri: "http://localhost:8000/",/* "file:///C:/Users/noelc/projects/shufflePlus/index.html", */ 
    }

    const url = authBaseUrl + formatUrl(params);

    console.log(url);

 /*    fetch(url)
        .then(response =>) */
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
})