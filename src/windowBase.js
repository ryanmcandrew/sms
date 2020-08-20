// author:ryanmcandrew & the web
//

const { app, BrowserWindow } = require('electron');

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    // and load the index.html of the app.
    win.loadFile('../index.html');
}

function display() {
    app.whenReady().then(createWindow);
}

module.exports.display = display;