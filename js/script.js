// <![CDATA[

( function( $ )
{
    
    function BM( $container, folderPath )
    {
        this.api        = chrome.bookmarks;
        this.tree       = null;
        this.folderPath = folderPath || '/Bookmarks Bar';
        this.folder     = null;
        this.$container = $container;
    }
    
    BM.prototype = {
        
        initialize : function( callback )
        {
            var self = this;
            
            this.api.getTree( function( tree )
            {
                self.tree   = tree[ 0 ];
                self.folder = self.getFolder( self.folderPath );
                
                if( !self.folder )
                {
                    self.createFolderRecursively( self.folderPath, function( folder )
                    {
                        self.folder = folder;
                        
                        callback.call( this );
                    } );
                }
                else
                {
                    callback.call( this );
                }
            } );
        },
        
        getFolder : function( path )
        {
            var parts   = path.split( '/' ),
                current = this.tree,
                part    = null,
                folder  = null;
            
            while( parts.length )
            {
                part = parts.shift();
                
                if( !part ) continue;
                
                current = this.getBookmarkInTree( current, part );
                
                if( !current || current.children === undefined )
                {
                    return;
                }
            }
            
            return current;
        },
        
        getBookmarkInTree : function( tree, title )
        {
            var bookmark;
            
            if( !title || !tree || !tree.children )
            {
                return;
            }
            
            for( var i = 0; i < tree.children.length; i++ )
            {
                bookmark = tree.children[ i ];
                
                if( bookmark.title && bookmark.title === title )
                {
                    return bookmark;
                }
            }
        },
        
        createFolder : function( path, callback )
        {
            var parts  = path.split( '/' ),
                title  = parts.pop(),
                parent = this.getFolder( parts.join( '/' ) );
            
            if( !parent || this.getBookmarkInTree( parent, title ) ) return;
            
            this.api.create(
                {
                    parentId : parent.id,
                    title    : title
                },
                function( folder )
                {
                    callback.call( this );
                }
            );
        },
        
        populate : function()
        {
            var $section, misc = [];
            
            function addSection( section )
            {
                if( section.children === undefined )
                {
                    misc.push( section );
                    return;
                };
                
                $section = $( '<section></section>' );
                $section.append( '<h1>' + section.title + '</h1>' );
                
                section.children.forEach( function( link )
                {
                    $section.append( '<a href="' + link.url + '">' + link.title + '</a>' );
                }, this );
                
                this.$container.append( $section );
            };
            
            this.folder.children.forEach( addSection, this );
            
            misc = { title: "Misc", children: misc };
            
            addSection.call( this, misc );
        }
    };
    
    var bm = new BM( $( '#container-right' ) );
    
    bm.initialize( function()
    {
        bm.populate();
    } );
    
} )( Zepto );

// ]]>