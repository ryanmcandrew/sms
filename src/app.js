// author:ryanmcandrew & the web
//

const hmi = require("./hmi/windowBase.js");
const appSrv = require("./comm/srv.js");
const sent = require("./nn/sentiment.js");
const db = require('./comm/db.js');



const b = require("./nn/brain.js");
const brain = new b.Brain;

const log4js = require('log4js');
log4js.configure("./conf/log4js.json");
const logger = log4js.getLogger();

function main() 
{
	// initialize();
	// hmi.display();
	var srv = new appSrv.AppServer();
	// var d = new db.AppDatabase();
	// console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
	// d.connect( ( err, cliCtx ) => {
	// 	var dbo  = cliCtx.db("examples");
	// 	var x = dbo.collections("sensibility");
	// 	x.then((err, res)=> {
	// 		// console.log(err)
	// 	} )
	// })
	// sent.tfTest();
	// brain.run();
	// logger.info(tsrv.getRequest("https://api.twitter.com/2/tweets"));
}

function initialize() 
{
	console.log(`Your bearer token:${process.env.BEARER_TOKEN}`);
}

main();
