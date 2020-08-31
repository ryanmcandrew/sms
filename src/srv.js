// author:ryanmcandrew & the web & docs
//

const https = require('https');
const fs = require("fs");
const needle = require('needle');
const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports.tmp = httpCall;
module.exports.getRequest = getRequest;

async function getRequest( url ) {
    const parameters = {
        "ids": "1290995618224254983"
    };

    const commResult = await needle('get', url, parameters, { headers: {
        "authorization": `Bearer ${process.env.BEARER_TOKEN}`
    }})

    try 
    {
        if (commResult) {
            logger.info("sending msg: " + commResult);
            return commResult;
        } 
        else {
            throw new Error("Get request communication failure");
        }
    }
    catch (e) {
        logger.error("Bad GET request");
    }
}

function httpCall() {
    options.agent = new https.Agent(options);
    const options = {
        hostname: 'api.twitter.com',
        port: 443,
        method: 'GET',
        path: "?ids=1278747501642657792",
        headers: `Authorization: Bearer ${process.env.BEARER_TOKEN}`
      };

    const req = https.request(options, (res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        
        res.on('data', (d) => {
            process.stdout.write("got data:\n");
                process.stdout.write(d);
            });
    });
        
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

