
( function( d )
{
    
    function Bookmark( node )
    {
        this.node = node;
    }
    
    Bookmark.prototype = {
        
        get isFolder()
        {
            return this.node.children !== undefined;
        },
        
        get id()
        {
            return this.node.id;
        },
        
        get title()
        {
            return this.node.title;
        },
        
        get url()
        {
            return this.node.url;
        },
        
        get children()
        {
            return this.node.children;
        }
    };
    
} )( this.Dashboard = this.Dashboard || {} );