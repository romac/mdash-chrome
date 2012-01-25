
( function( mdash, $ )
{
    
    var EditCtrl = mdash.EditCtrl = function( $btn, $bookmarks )
    {
        this.$doc       = $( document.documentElement );
        this.$btn       = $btn;
        this.$bookmarks = $bookmarks;
        this.api        = chrome.bookmarks;
        this.altPressed = false;
    };
    
    EditCtrl.prototype.init = function()
    {
        var self = this;
        this.removeContextMenus();
        
        this.$btn.bind( 'click', this.toggleEdit.bind( this ) );
    };
    
    EditCtrl.prototype.listenForAlt = function()
    {
        var $win = $( window ), self = this;
        
        $win.bind( 'keydown', function( e )
        {
            if( e.keyIdentifier === 'Alt' )
            {
                self.$doc.addClass( 'alt' );
            }
        } );
        
        $win.bind( 'keyup', function( e )
        {
            if( e.keyIdentifier === 'Alt' )
            {
                self.$doc.removeClass( 'alt' );
            }
        } );
    };
    
    EditCtrl.prototype.createContextMenus = function()
    {
        chrome.contextMenus.create(
            {
                type                : 'normal',
                title               : 'Remove bookmark',
                contexts            : [ 'link' ],
                onclick             : this.remove.bind( this ),
                // documentUrlPatterns : [ 'chrome://*' ]
            }
        );
        
        chrome.contextMenus.create(
            {
                type                : 'normal',
                title               : 'Rename bookmark',
                contexts            : [ 'link' ],
                onclick             : this.rename.bind( this ),
                // documentUrlPatterns : [ 'chrome://*' ]
            }
        );
    };
    
    EditCtrl.prototype.removeContextMenus = function()
    {
        chrome.contextMenus.removeAll( this.createContextMenus.bind( this ) );
    };
    
    EditCtrl.prototype.remove = function( info, tab )
    {
        var id, $link = $( mdash.links[ info.linkUrl ] );
        
        if( !$link || !( id = $link.attr( 'id' ) ) ) return;
        
        this.api.remove( id, function()
        {
            $link.addClass( 'removed' );
            setTimeout( function()
            {
                $link.remove();
            }, 500 );
            mdash.Growl.show( 'Bookmark ' + $link.find( 'span' ).text() + ' has been removed.' );
        } );
    };
    
    EditCtrl.prototype.rename = function( info, tab )
    {
        var id, $link = $( mdash.links[ info.linkUrl ] );
        
        if( !$link || !( id = $link.attr( 'id' ) ) ) return;
        
        var $title   = $link.find( 'span' ),
            newTitle = prompt( 'Edit the title: ', $title.text() );
        
        this.api.update( id, { title: newTitle }, function()
        {
            $title.text( newTitle );
        } );
    };
    
    EditCtrl.prototype.toggleEdit = function( e )
    {
        e.preventDefault();
        this.$bookmarks.toggleClass( 'edit' );
        
        if( this.$bookmarks.hasClass( 'edit' ) )
        {
            var self = this;
            
            this.$btn.html( 'done' );
            this.$bookmarks.find( 'a' ).bind( 'click', function( e )
            {
                e.preventDefault();
                
                // aaaaargh!
                self.rename( {
                    linkUrl: $( e.target ).attr( 'href' )
                } );
            } );
            
            this.$bookmarks.find( '.del' ).bind( 'click', function( e )
            {
                self.remove( {
                    linkUrl: $( e.target ).parent().attr( 'href' )
                } );
            } );
        }
        else
        {
            this.$btn.html( 'edit' );
            self.$bookmarks.find( 'a' ).unbind( 'click' );
            self.$bookmarks.find( '.del' ).unbind( 'click' );
        }
    };
    
} )( window.mdash, Zepto );