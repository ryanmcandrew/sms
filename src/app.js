// author:ryanmcandrew & the web
//

const hmi = require("./hmi/windowBase.js");

const tsrv = require("./comm/srv.js");

const sent = require("./nn/sentiment.js");

const b = require("./nn/brain.js");
const brain = new b.Brain;

const Autohook = require('twitter-autohook');

const log4js = require('log4js');
log4js.configure("./conf/log4js.json");
const logger = log4js.getLogger();

function main() {
	initialize();
	hmi.display();
	const srv = new tsrv.AppServer();
	// sent.tfTest();
	// brain.run();
	// logger.info(tsrv.getRequest("https://api.twitter.com/2/tweets"));
}

function initialize() {
	console.log(`Your bearer token:${process.env.BEARER_TOKEN}`);
}

main();
