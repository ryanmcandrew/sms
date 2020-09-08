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

    win.loadFile('../data.html');  
    setProcessRules();
}

function setProcessRules() {
  var ipc = require('electron').ipcMain;

  ipc.on('invokeAction', function(event, data){
    var result = processData(data);

    result.then(res => {
      logger.info("sending request result to gui. follows.");
      logger.info(res.body);
      data = res.body;
      event.sender.send('actionReply', data);
    })
    .catch(err => {
      logger.error(err);
    });
  });
}

function processData(data) {
  return tsrv.getRequest(data);
}

function display() {
    app.whenReady().then(createWindow);
}

module.exports.display = display;