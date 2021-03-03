const pug = require("pug");

class AppDocument {

    constructor()
    {
        var path = process.env.SERVER_ROOT + '/views/';
        this.content = "html\n\thead\n\t\tinclude " + path + "meta.pug\n";
        this.content += "\n\tbody\n\t\tinclude " + path + "header.pug\n";
    }

    /**
     * 
     */
    rend() 
    {
        var path = process.env.SERVER_ROOT + '/views/';
        this.content += "\t\tinclude " + path + "footer.pug\n";
        return pug.render(this.content, {filename:'this'});
    }

    /**
     * 
     * @param {*} str 
     */
    add(str) 
    {
        this.content += str;
    }
}

module.exports.appDocument = AppDocument;