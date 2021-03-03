// author:ryanmcandrew & the web
//

const { app, BrowserWindow } = require('electron');
const log4js = require('log4js');
const logger = log4js.getLogger();
const tsrv = require("../comm/srv.js");

function createWindow () {
    const win = new BrowserWindow({
      width: 700,
      height: 800,
      webPreferences: {
        nodeIntegration: true
      }
    })

    win.loadFile('../assets/index.html');  
    setProcessRules();
}

function setProcessRules() {
  var ipc = require('electron').ipcMain;

  ipc.on('invokeAction', function(event, data){
    var result = processData(data);

    result.then(res => {
      data = res.body;
      logger.info("sending request result to gui. follows.");
      logger.info(res.body.data[0])
      event.sender.send('actionReply', data);
    })
    .catch(err => {
      logger.error(err);
    });
  });
}

function processData(data) {
  // logger.info(data);
  // return tsrv.getTwitterUser();
  return tsrv.getTweet(data.url, data.parameters);
}

function display() {
    app.whenReady().then(createWindow);
}

module.exports.display = display;