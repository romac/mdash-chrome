
( function( mdash )
{
    
    var Manager = mdash.Manager = function() {},
        proto   = Manager.prototype;
    
    proto.api              = chrome.bookmarks;
    proto.FOLDER_NAME      = '[Dashboard]';
    proto.PLACEHOLDER_NAME = '[MDASH_DO_NOT_DELETE]';
    
    proto.init = function( callback )
    {
        var _this = this;
        
        this.api.getTree( function( tree )
        {
            _this.tree = tree[ 0 ];
        } );
        
        this.checkRootFolder( callback );
    };
    
    proto.hasBookmarks = function( callback )
    {
        this.getSections( function( sections )
        {
            callback( !!sections.length );
        } );
    };
    
    proto.fetchSections = function( callback )
    {
        var _this = this;
        
        if( this.folder.children )
        {
            callback( this.folder.children );
            
            return;
        }
        
        this.api.getChildren( this.folder.id, function( children )
        {
            children.forEach( function( b, i )
            {
                if( b.title === _this.PLACEHOLDER_NAME )
                {
                    delete children[ i ];
                    
                    return;
                }
                
                var firstChar = b.title.substring( 0, 1 );
                
                if( firstChar === '+' )
                {
                    b.side = 'left';
                }
                else if( firstChar === '-' )
                {
                    b.side = 'right';
                }
                else
                {
                    delete children[ i ];
                    
                    return;
                }
                
                b.title = b.title.substring( 1 );
            } );
            
            _this.folder.children = children;
            
            callback( children );
        } );
    };
    
    proto.getSections = function( side, callback )
    {
        var _this = this;
        side = side || 'left';
        
        this.fetchSections( function( sections )
        {
            var results = [],
                index   = 1;
            
            sections.forEach( function( section )
            {
                if( section.side === side )
                {
                    results.push( section );
                }
            } );
            
            results.forEach( function( section )
            {
                _this.fetchSectionBookmarks( section, function( i )
                {
                    return function()
                    {
                        if( i === results.length )
                        {
                            callback( results );
                        }
                    }
                }( index++ ) );
            } );
        } );
    };
    
    proto.fetchSectionBookmarks = function( section, callback )
    {
        this.api.getChildren( section.id, function( bookmarks )
        {
            section.children = bookmarks;
            
            callback( section.bookmarks );
        } )
    };
    
    proto.checkRootFolder = function( callback )
    {
        var _this = this;
        
        this.api.search(
            this.PLACEHOLDER_NAME,
            function( results )
            {
                if( !results.length )
                {
                    _this.createRootFolder( callback );
                }
                else
                {
                    _this.api.get( results[ 0 ].parentId, function( folder )
                    {
                        _this.folder = folder[ 0 ];
                        
                        callback();
                    } );
                }
            }
        );
    };
    
    proto.createRootFolder = function( callback )
    {
        var _this = this;
        
        this.api.create(
            {
                parentId : this.tree.children[ 1 ].id,
                title    : this.FOLDER_NAME
            },
            function( folder )
            {
                delete this.tree;
                
                _this.folder = folder;
                _this.createPlaceholder( callback );
            }
        );
        
        this.createRootFolder = function() { callback(); };
    };
    
    proto.createPlaceholder = function( callback )
    {
        this.api.create(
            {
                parentId : this.folder.id,
                title    : this.PLACEHOLDER_NAME,
                url      : 'about:blank'
            },
            callback
        );
        
        this.createPlaceholder = function() { callback() };
    };
    
} )( window.mdash );
