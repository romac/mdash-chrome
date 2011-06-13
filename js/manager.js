
( function( global, chrome, d )
{
    
    d.Manager = Manager;
    
    function Manager( rootPath, FinderClass )
    {
        this.rootPath    = rootPath;
        this.api         = chrome.bookmarks;
        this.FinderClass = FinderClass;
    }
    
    Manager.prototype = {
        
        initialize : function( cb )
        {
            var self = this;
            
            this.api.getTree( function( trees )
            {
                self.tree   = trees[ 0 ];
                self.finder = new self.FinderClass( self.tree );
                
                cb && cb.call && cb.call( self );
            } );
        },
        
        getRoot: function()
        {
            if( !this.root )
            {
                this.root = this.finder.findByPath( this.rootPath );
            }
            
            return this.root;
        },
        
        create : function( path, props )
        {
            var parts = ( this.rootPath + '/' + path ).split( '/' ),
                ptr   = 0,
                cur   = this.tree,
                tmp   = null,
                i;
            
            for( i = 0; i < parts.length; i++ )
            {
                _( i, cur );
                
                tmp = this.finder.findBy( 'title', parts[ i ], this.FinderClass.TYPE.FOLDER, cur );
                
                if( !tmp )
                {
                    tmp = this.api.create(
                        {
                            title : parts[ i ],
                            parentId : cur.id
                        }
                    );
                }
                
                cur = tmp;
            }
            
            props.parentId = cur.id;
            
            return this.api.create( props );
        }
    };
    
} )( this, chrome, this.Dashboard = this.Dashboard || {} );
