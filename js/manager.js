
( function( global, chrome, d )
{
    
    d.Manager = Manager;
    
    function Manager( rootPath, Finder )
    {
        this.rootPath = rootPath;
        this.api      = chrome.bookmarks;
        this.Finder   = Finder;
    }
    
    Manager.prototype = {
        
        initialize : function( cb )
        {
            var self = this;
            
            this.api.getTree( function( trees )
            {
                self.tree   = trees[ 0 ];
                self.finder = new self.Finder( self.tree );
                
                if( !self.root )
                {
                    self.create(
                        '',
                        {
                            title : '[DO_NOT_DELETE]',
                            url   : 'about:blank'
                        },
                        function( doNotDelete, root )
                        {
                            this._root = root;
                            
                            cb && cb( self );
                        }
                    );
                }
                else
                {
                    cb && cb( self );
                }
            } );
        },
        
        get root()
        {
            return this._root;
        },
        
        create : function( path, props, cb )
        {
            var self  = this,
                parts = ( this.rootPath + '/' + path ).split( '/' ),
                cur   = this.tree,
                tmp   = null;
            
            function loop( cb )
            {
                var part = parts.shift();
                
                if( !part )
                {
                    cb( cur );
                    
                    return;
                }
                
                tmp = self.finder.findBy(
                    'title',
                    part,
                    self.Finder.TYPE.FOLDER,
                    cur
                );
                
                if( !tmp )
                {
                    self.api.create(
                        {
                            title    : part,
                            parentId : cur.id
                        },
                        function( result )
                        {
                            cur = result;
                            
                            loop( cb );
                        }
                    );
                }
                else
                {
                    cur = tmp;
                    
                    loop( cb );
                }
            }
            
            loop( function( parent )
            {
                props.parentId = parent.id;
                
                self.api.create(
                    props,
                    function( bookmark )
                    {
                        cb && cb( bookmark, cur );
                    }
                );
            } );
        }
    };
    
} )( this, chrome, this.Dashboard = this.Dashboard || {} );
