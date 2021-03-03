// author:ryanmcandrew & the web & docs
//

const fs = require("fs");
const http = require('http');
const https = require('https');

const log4js = require('log4js');
const logger = log4js.getLogger();

const express = require('express');
const cookieParser = require('cookie-parser');
const pug = require("pug");

const doc = require("../hmi/appDocument.js");
const scrollPane = require("../hmi/model/tweetScroller.js");
const lib = require('./util.js')

class AppServer 
{
    constructor() 
    {
        if (this.app == null)
        {
            logger.info("started new server");

            this.app = express();
            var options = {
                key: fs.readFileSync(`${process.env.APP_CERT_KEY}`),
                cert: fs.readFileSync(`${process.env.APP_CERT}`)
            }; 

            this.host = http.createServer(this.app).listen(80);
            this.secureHost = https.createServer(options, this.app).listen(443);

            this.app.use(cookieParser());

            this.app.use(function(req,res,next) {
                if ( req.cookies.rrmNoTrack != null ) 
                {
                    res.cookie('rrmNoTrack', req.cookies.rrmNoTrack)
                    logger.info("set cookie" + req.headers.cookie.split(";")[0])
                }
                else { 
                    logger.info('no cookie ' + req.cookies.rrmNoTrack )
                }
                next();
            });

            this.app.use(express.static(`${process.env.SERVER_ROOT}`));
            
            this.setRoutes();
        } 
    }

    setRoutes() 
    {
        this.app.get('/', (req, res) => {
            var dir = `${process.env.SERVER_ROOT}` + "/views/";
            var d = new doc.appDocument();
            
            logger.info("received / request: " + req.method + " " + req.path);
            d.add("\t\tinclude " + dir + "homeBody.pug\n");
            
            res.send(d.rend());
        });

        this.app.get('/sma', (req, res) => {
            var dir = `${process.env.SERVER_ROOT}` + "/views/";
            var d = new scrollPane.tweetScroller();

            logger.info("received / request: " + req.method + " " + req.path);
            d.load().then( r => {
                res.send(d.rend());
            })

        });

        this.app.get('*', (req, res) => {
            logger.info("received * request: " + req.method + " " + req.path);
            var dir = `${process.env.SERVER_ROOT}`+"/views/404.pug";
            var body = pug.renderFile(dir, {});
            res.send(body);
        });
    }
}

module.exports.AppServer = AppServer;
