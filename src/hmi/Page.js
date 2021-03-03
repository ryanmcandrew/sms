
class _Page extends EventEmitter
{
    constructor()
    {
        this.content = "html\n\tinclude meta.pug\n";
    }
    
    add(data)
    {
        if (data)
        {
            this.content += " " + data + "\n";
        }  
    }
}

module.exports.Page = _Page;