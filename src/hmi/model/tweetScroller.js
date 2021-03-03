const log4js = require('log4js');
const logger = log4js.getLogger();

const doc = require('../appDocument.js')
const lib = require('../../comm/util.js');

class TweetScroller extends doc.appDocument
{
    
    constructor() 
    {
        super()
    }

    async load()
    {
        lib.filteredStreamConnect().on('data', d => {
            console.log(d);
            // if ( res != null && res.body != undefined ) {
            //     this.content += res.body;
            // }
        });
    }
}

module.exports.tweetScroller = TweetScroller;