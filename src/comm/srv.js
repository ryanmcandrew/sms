// author:ryanmcandrew & the web & docs
//

const fs = require("fs");
const http = require('http');
const https = require('https');
const needle = require('needle');

const log4js = require('log4js');
const logger = log4js.getLogger();

const express = require('express');

class AppServer {

    host = null;
    secureHost = null;
    app = null;

    constructor() 
    {
        if (this.app == null)
        {
            this.app = express();
            var options = {
                key: fs.readFileSync(`${process.env.APP_CERT_KEY}`),
                cert: fs.readFileSync(`${process.env.APP_CERT}`)
            }; 

            this.host = http.createServer(this.app).listen(80);
            this.secureHost = https.createServer(options, this.app).listen(443);

            this.app.use(express.static(`${process.env.SERVER_ROOT}`))

            this.app.get('*', (req, res) => {
                logger.info("received request: " + req.method);
                res.sendFile(`${process.env.SERVER_ROOT}`);
            })
        } 
    }

}

module.exports.getRequest = getRequest;
module.exports.AppServer = AppServer;

async function getRequest( url ) {

    var result = null; 

    const parameters = 
    {
        "ids": "1303020794780487682",
        "tweet.fields" : "attachments,author_id,context_annotations,created_at," +
                        "entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics," +
                        "referenced_tweets,source,text,withheld",
    };

    try 
    {
        logger.info("sending get request to: " + url);

        const promiseResult = await needle('get', url, parameters, { 
            headers:
            { 
                "authorization":`Bearer ${process.env.BEARER_TOKEN}`
            }
        });

        if (promiseResult) 
        {
            return promiseResult;
        }
        else 
        {
            throw new Error("get comm error");
        }
    }
    catch (e) 
    {
        logger.error("Bad GET request: " + e);
    }
}