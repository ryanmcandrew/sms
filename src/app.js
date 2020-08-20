// author:ryanmcandrew & the web
//

const hmi = require("./windowBase.js");
const tsrv = require("./srv.js");
const Autohook = require('twitter-autohook');

function main() {
	console.log(`Your bearer token:${process.env.BEARER_TOKEN}`);
	hmi.display();
}

main();
tsrv.tmp();