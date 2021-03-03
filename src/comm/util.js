const needle = require('needle');

const log4js = require('log4js');
const logger = log4js.getLogger();


module.exports.getTweet = getTweet;
module.exports.getRequest = getRequest;
module.exports.filteredStreamConnect = filteredStreamConnect;

/**
 * 
 */
function filteredStreamConnect() 
{
    return needle.get('https://api.twitter.com/2/tweets/search/stream', 
                        { 
                            headers: 
                            {
                                // "Authorization":
                                //     "OAuth " +
                                //     "oauth_consumer_key=" + process.env.oauth_consumer_key + ", " +
                                //     "oauth_consumer_secret=" + process.env.oauth_consumer_secret + ", " +
                                //     "oauth_token=" + process.env.oauth_token + ", " +
                                //     "oauth_token_secret=" + process.env.oauth_token_secret + ", " +
                                //     "oauth_nonce=" + oauthRandom() + ", " +
                                //     "oauth_signature_method=HMAC-SHA1," +
                                //     "oauth_timestamp=" + Date.now() / 60 + ", " +
                                //     "oauth_version=1.0"
                                "authorization":`Bearer ${process.env.BEARER_TOKEN}`
                                
                            } 
                        }, {timeout:20000});
}

function oauthRandom()
{
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * 
 */
async function getTweetHtml() 
{

}

/**
 * 
 * @param {*} url 
 * @param {*} paramObj 
 */
async function getTwitterUser( id ) 
{
    var str = "https://api.twitter.com/2/users/"
    var parameters = {
        "user.fields" : "created_at",
        "expansions":"pinned_tweet_id",
        "tweet.fields":"author_id,created_at",
    }
    return getRequest(str+id, parameters);
}

/**
 * 
 * @param {*} url 
 * @param {*} paramObj 
 */
async function getTweet( paramObj ) 
{
    var uri = "https://api.twitter.com/2/tweets";
    var parameters = 
    {
        "tweet.fields" : "attachments,author_id,context_annotations,created_at," +
                        "entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics," +
                        "referenced_tweets,source,text,withheld",
        "ids" : paramObj.ids,
        "user.fields" : "name,description,id,profile_image_url"

    };

    // console.log(paramObj);
    // console.log(parameters);

    return getRequest(uri, parameters);
}

function getFilterParameters() 
{
    return {

    }    
}

function getTweetParameters() 
{
    return {
        "tweet.fields": "attachments,author_id,context_annotations,created_at," +
            "entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics," +
            "referenced_tweets,source,text,withheld", 
        "user.fields" : "name,description,id,profile_image_url"
    };
}

async function getRequest( url, parameters ) 
{
    try 
    {
        logger.info("sending")
        logger.info(url)
        logger.info(parameters)

        const promiseResult = await needle('get', url, parameters, { 
            headers:
            { 
                "authorization":`Bearer ${process.env.BEARER_TOKEN}`
            }
        });

        if (!promiseResult) 
        {
            throw new Error("needle did not return promise");
        }
 
        return promiseResult;
    }
    catch (e) 
    {
        logger.error("Exception with get request: " + e);
    }
}