// author:ryanmcandrew & the web
//

const hmi = require("./windowBase.js");
const tsrv = require("./srv.js");
const Autohook = require('twitter-autohook');
const log4js = require('log4js');
const logger = log4js.getLogger();

function main() {
	console.log(`Your bearer token:${process.env.BEARER_TOKEN}`);
	hmi.display();
	// tsrv.tmp();
	console.log(tsrv.getRequest("https://api.twitter.com/2/tweets"));
}

main();
