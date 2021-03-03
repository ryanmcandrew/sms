/**
 * 
 */
function main() {

    if ( getCookie("rrmNoTrack") != "set" ) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'UA-118290817-1');
    }

    document.getElementById("analyticsSwitch").addEventListener("click", () => {
        if (getCookie("rrmNoTrack") == "set") {
            setCookie("rrmNoTrack", "unset", 7, " SameSite=None; Secure; Max-Age=-99999999;");
            console.log("previously set cookie:" + document.cookie)
        }
        else {
            window.alert("I have left a cookie in your browser ( expiry: 7 days ) so I can look it up next time you visit to block analytics. If you press the button again, I will destroy the cookie for you and reenable analytics on your device after you refresh the page. Please note that if you delete your cookies or view this page from a different browser, I will not remember you don't want to be tracked!")
            setCookie("rrmNoTrack", "set", 7, " SameSite=Strict; Secure; Max-Age=31536000");
            console.log("previously unset cookie:" + document.cookie)
        }
        updateDisplay();
    });

    updateDisplay();
}

main();

/**
 * 
 */
function getAppData() {
    
}

/**
 * 
 */
function windowConnector() {
    // var ipc = require('electron').ipcRenderer;

    ipc.once('actionReply', function(event, response){
        processResponse(response);
    })

    var obj = {
        type: "tweet",
        url: document.getElementById('url').value, 
        parameters: { "ids" : document.getElementById('twitter-id').value }
    }

    ipc.send('invokeAction', obj );    
}


/**
 * 
 * @param {*} response 
 */
function processResponse(response) {
    var bq, ts, p = null;

    for (var i in response.data) {
        bq = document.createElement("blockquote");
        ts = document.createElement("div");
        p = document.createElement("p");

        bq.innerText = response.data[i].text + "\n";
        ts.innerText = frmtTimestamp(response.data[i].created_at);
        p.lang = "en";
        p.dir = "ltr";
        bq.appendChild(p);
        bq.appendChild(ts);
        document.getElementById('tweet-content').appendChild(bq); 
    }
}  

/**
 * 
 * @param {*} str
 */
function frmtTimestamp(str) {
    return (new Date(str)).toUTCString();
}

/**
 * 
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {*} exdays 
 * @param {*} options 
 */
function setCookie(cname, cvalue, exdays, options) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    
    document.cookie = cname + "=" + cvalue
    console.log(document.cookie);
}

/**
 * 
 * @param {*} cname 
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');	
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * 
 * @param {*} lval 
 * @param {*} rval 
 */
function containsStr(lval, rval) {
    return lval.search(rval);
}

/**
 * 
 */
function updateDisplay() {
    if (getCookie("rrmNoTrack") == "set") {
        document.getElementById("analyticsSwitch").innerText="remove no-track cookie";
        console.log("switched on")
    }
    else {
        console.log("switched off")
        document.getElementById("analyticsSwitch").innerText="set no-track cookie";
    }
}

/**
 * 
 */
function receive(nodeData) {
    // console.log(nodeData)
}


