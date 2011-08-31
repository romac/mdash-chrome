
( function( exports )
{
    
    var Manager = exports.Manager = function() {},
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
    };
    
    proto.hasBookmarks = function( callback )
    {
        this.getSections( function( sections )
        {
            callback( !!sections.length );
        } );
    };
    
    proto.getBookmarks = function( callback )
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
                    
                    return false;
                }
            } );
            
            _this.folder.children = children;
            
            callback( children );
        } );
    };
    
    proto.rootFolderExists = function( callback )
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
                title    : this.folderName
            },
            function( folder )
            {
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
                parentId : folder.id,
                title    : this.placeHolder,
                url      : 'about:blank'
            },
            callback
        );
        
        this.createPlaceholder = function() { callback() };
    };
    
} )( window );
