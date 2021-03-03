const MongoClient = require('mongodb').MongoClient;

const log4js = require('log4js');
log4js.configure("./conf/log4js.json");
const logger = log4js.getLogger();

class AppDatabase {
    constructor() {
        this.uri = 'mongodb+srv://rmDev:'+`${process.env.DB_PASS}`+'@testcluster.67xji.mongodb.net/'+`${process.env.DB_NAME}`+'?retryWrites=true&w=majority';
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect(subroutine) {
        
        this.client.connect(subroutine);
    }

    async close() {
        this.client.close();
    }

    registerServerActions(err, cliCtx) {
        var dbo = cliCtx.db("examples")
        dbo.collection("sensibility").findOne({}, function(error, result) {
            logger.info("found first")
            logger.info(result);
        })
    }

    find(db, key, value, subroutine ) {
        result = dbo.collection("sensibility").findOne( { key : value }, subroutine );
    }
}

module.exports.AppDatabase = AppDatabase;
