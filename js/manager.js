
( function( global, chrome, d )
{
    
    var api = chrome.bookmarks;
    
    function Manager()
    {
        
    }
    
    Manager.prototype = {
        
        folderName  : '[Dashboard]',
        placeHolder : '[MDASH_DO_NOT_DELETE]',
        
        initialize : function( callback )
        {
            var self = this;
            
            api.getTree( function( tree )
            {
                self.tree = tree[ 0 ];
            } );
            
            api.search(
                self.placeHolder,
                function( results )
                {
                    if( !results.length )
                    {
                        self.createRoot( callback );
                    }
                    else
                    {
                        api.get( results[ 0 ].parentId, function( folder )
                        {
                            self.folder = folder[ 0 ];
                            
                            callback();
                        } );
                    }
                }
            );
        },
        
        hasBookmarks : function( callback )
        {
            var self = this;
            
            this.getSections( function( sections )
            {
                callback( !!sections.length );
            } );
        },
        
        getSections : function( callback )
        {
            var self = this;
            
            if( this.folder.children )
            {
                callback( this.folder.children );
                
                return;
            }
            
            api.getChildren( this.folder.id, function( children )
            {
                children.forEach( function( b, i )
                {
                    if( b.title === self.placeHolder )
                    {
                        children.splice( i, 1 );
                    }
                } );
                
                self.folder.children = children;
                
                callback( children );
            } );
        },
        
        getBookmarks : function( section, callback )
        {
            var self = this;
            
            if( section.children )
            {
                callback( section.children );
                
                return;
            }
            
            api.getChildren( section.id, function( children )
            {
                section.children = children;
                
                callback( children );
            } );
        },
        
        createRoot : function( callback )
        {
            var self = this;
            
            api.create(
                {
                    parentId : self.tree.children[ 1 ].id,
                    title    : self.folderName
                },
                function( folder )
                {
                    self.folder = folder;
                    
                    api.create(
                        {
                            parentId : folder.id,
                            title    : self.placeHolder,
                            url      : 'about:blank'
                        },
                        function()
                        {
                            callback();
                        }
                    );
                }
            );
            
            self.createRoot = function( callback ) { callback(); };
        }
    };
    
    d.Manager = Manager;
    
} )( this, chrome, this.Dashboard = this.Dashboard || {} );
