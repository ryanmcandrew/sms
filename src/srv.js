// author:ryanmcandrew & the web
//

const https = require('https');
const fs = require("fs");

const options = {
    hostname: 'api.twitter.com',
    port: 443,
    path: 'labs/2/tweets/search?query=caturday%20has:images%20-is:retweet&tweet.fields=created_at,author_id,lang',
    method: 'GET',
    headers: `Bearer ${process.env.BEARER_TOKEN}`,
    key: fs.readFileSync('certs/94872247_ryanmcandrew.net.key'),
    cert: fs.readFileSync('certs/94872247_ryanmcandrew.net.cert')
  };

options.agent = new https.Agent(options);

function tmp() {
    const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        
        res.on('data', (d) => {
                process.stdout.write(d);
            });
    });
        
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

module.exports.tmp = tmp;