const authBaseUrl = "https://accounts.spotify.com/authorize?";






function receiveAuthToken() {
    if (!window.location.hash) {
        return false
    }
    console.log("hash is: " + window.location.hash);
    const tokenSlices = window.location.hash.split(/[=&]/);
    console.log("tokenSlices are: " + tokenSlices);
    return tokenSlices[1]
}


function handleAuth() {
    let token = receiveAuthToken();
    console.log(token);
    if (!token) {
        console.log("ask for token");
    } else {
        console.log("show rest of app");
    }
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
    window.open(url);
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