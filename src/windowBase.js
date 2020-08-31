// author:ryanmcandrew & the web
//

const { app, BrowserWindow } = require('electron');

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 700,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    // and load the index.html of the app.
    win.loadFile('../index.html');
    // document.getElementById("");
}

function display() {
    app.whenReady().then(createWindow);
}

module.exports.display = display;