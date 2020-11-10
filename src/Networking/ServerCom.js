var URL = "http://isiswork03.di.unisa.it:1337"

export async function setURL(newURL) {
    URL = newURL;
}

export async function register(success, error, username, facebookid = null, googleid = null) {

    let data = "username=" + username;
    if (facebookid != null)
        data += "&facebookid=" + facebookid;
    if (googleid != null)
        data += "&googleid=" + googleid;

    fetch(URL+'/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success(response.headers.get("id"));
        else
            response.text().then(data => error(data));
        }, e => error(e));
}

export async function associateFacebook(userid, facebookid, success, error) {
    let data = "userid=" + userid;
    data += "&facebookid=" + facebookid;

    fetch(URL+'/associatefacebook', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function startSession(userid, locationid, success, error) {
    let data = "userid=" + userid;
    data += "&locationid=" + locationid;

    fetch(URL + '/startsession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            response.json().then(gameStates => success(gameStates));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function startSessionToken(userid, locationid, token, success, error) {
    let data = "userid=" + userid;
    data += "&locationid=" + locationid;
    data += "&token=" + token;

    fetch(URL + '/startsessiontoken', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function confirmSession(userid, locationid, success, error) {
    let data = "userid=" + userid;
    data += "&locationid=" + locationid;

    fetch(URL + '/confirmsession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            response.json().then(gameStates => success(gameStates));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function endSession(userid, locationid, gameState, success, error) {
    let data = "userid=" + userid;
    data += "&locationid=" + locationid;
    data += "&gamestate=" + gameState;

    fetch(URL + '/endsession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function getSessionToken(locationid, success, error) {
    let data = "locationid=" + locationid;

    fetch(URL + '/getsessiontoken', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success(response.headers.get("token"));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function getNewSession(locationid, success, error) {
    let data = "locationid=" + locationid;

    fetch(URL + '/getnewsession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success(response.headers.get("sessionid"), response.headers.get("userid"));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

export async function checkSession(userid, locationid, success, error) {   //function to know if a user has already played with a location
    if (userid == undefined || userid == null) error(404); 
    let data = "userid=" + userid;
    data += "&locationid=" + locationid;

    fetch(URL + '/checksession?' + data, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow'
    }).then(response => {
        if (response.status == 200)
            success();
        else
            error(response.status);
    }, e => error(e));
}

//admin
async function getUser(userid, success, error) {
    let data = "userid=" + userid;

    fetch(URL + '/getuser?' + data, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow'
    }).then(response => {
        if (response.status == 200)
            response.json().then(user => success(user));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function listUsers(success, error) {

    fetch(URL + '/listusers', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow'
    }).then(response => {
        if (response.status == 200)
            response.json().then(users => success(users));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function updateUser(success, error, userid, username = null, facebookid = null) {
    let data = "userid=" + userid;
    if (facebookid != null)
        data += "&facebookid=" + facebookid;
    if (username != null)
        data += "&username=" + username;

    fetch(URL + '/updateuser', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function addUser(success, error, username, facebookid = null) {
    let data = "username=" + username;
    if (facebookid != null)
        data += "&facebookid=" + facebookid;

    fetch(URL + '/adduser', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success(response.headers.get("id"));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function removeUser(userid, success, error) {
    let data = "userid=" + userid;

    fetch(URL + '/removeuser', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function getSession(sessionid, success, error) {
    let data = "sessionid=" + sessionid;

    fetch(URL + '/getsession?' + data, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow'
    }).then(response => {
        if (response.status == 200)
            response.json().then(session => success(session));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function listSessions(success, error) {

    fetch(URL + '/listsessions', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow'
    }).then(response => {
        if (response.status == 200)
            response.json().then(sessions => success(sessions));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function updateSession(sessionid, userid, locationid, state, gamestate, success, error) {
    let data = "sessionid=" + sessionid;
    if (userid != null && userid != undefined)
        data += "&userid=" + userid;
    if (locationid != null && locationid != undefined)
        data += "&locationid=" + locationid;
    if (state != null && state != undefined)
        data += "&state=" + state;
    if (gamestate != null && gamestate != undefined)
        data += "&gamestate=" + gamestate;

    fetch(URL + '/updatesession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function addSession(success, error, userid, locationid, state, gamestate = null) {
    let data = "userid=" + userid;
    data += "&locationid=" + locationid;
    data += "&state=" + state;
    if (gamestate != null && gamestate != undefined)
        data += "&gamestate=" + gamestate;

    fetch(URL + '/addsession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success(response.headers.get("sessionid"));
        else
            response.text().then(data => error(data));
    }, e => error(e));
}

async function removeSession(sessionid, success, error) {
    let data = "sessionid=" + sessionid;

    fetch(URL + '/removesession', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        body: data
    }).then(response => {
        if (response.status == 200)
            success();
        else
            response.text().then(data => error(data));
    }, e => error(e));
}
