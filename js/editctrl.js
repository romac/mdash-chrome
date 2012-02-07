
( function( mdash, $ )
{
    
    var EditCtrl = mdash.EditCtrl = function( $btn, $bookmarks )
    {
        this.$doc       = $( document.documentElement );
        this.$bookmarks = $bookmarks;
        this.api        = chrome.bookmarks;
    };
    
    EditCtrl.prototype.init = function()
    {
        this.listenForAlt();
    };
    
    EditCtrl.prototype.listenForAlt = function()
    {
        var $win = $( window ),
            self = this,
            edit = function( e )
            {
                e.preventDefault();
                e.stopPropagation();
                
                self.edit( $( e.target ) );
            };
        
        $win.bind( 'keydown', function( e )
        {
            if( e.keyCode === 18 )
            {
                self.$doc.addClass( 'alt' );
                self.$doc.on( 'click', '#bookmarks a', edit );
            }
        } );
        
        $win.bind( 'keyup', function( e )
        {
            if( e.keyCode === 18 )
            {
                self.$doc.removeClass( 'alt' );
                self.$doc.off( 'click', '#bookmarks a', edit );
            }
        } );
    };
    
    EditCtrl.prototype.edit = function( $b )
    {
        var $form, $title, $url, $remove, dialog,
            self  = this,
            id    = $b.attr( 'id' ),
            title = $b.find( 'span' ).text();
        
        $form  = $( '<div class="ui-edit-form">' );
        $title = $( '<input autofocus id="title" type="text"/>' ).val( title ).focus();
        $url   = $( '<input id="url" type="text"/>' ).val( $b.attr( 'href' ) );
        $rmBtn = $( '<a id="remove" href="#">Remove</a>' ).click( function( e )
        {
            e.preventDefault();
            
            self.remove( id, function()
            {
                dialog.hide();
            } );
        } );
        
        $form.append( $title, $url, $rmBtn );
        
        dialog = ui.confirm( 'Edit \'' + title + '\'', $form );
        dialog.show( function( ok )
        {
            if( ok )
            {
                self.update( id, {
                    title: $title.val(),
                    url  : $url.val()
                }, function() { dialog.hide(); } );
            }
            else
            {
                dialog.hide();
            }
        } );
    };
    
    EditCtrl.prototype.remove = function( id, callback )
    {
        var $el = $( document.getElementById( id ) );
        
        this.api.remove( id, function()
        {
            $el.addClass( 'removed' );
            
            setTimeout( callback, 0 );
            setTimeout( function() { $el.remove(); }, 500 );
            
            ui.notify(
                'Bookmark ' + $el.find( 'span' ).text() + ' has been removed.'
            );
        } );
    };
    
    EditCtrl.prototype.update = function( id, props, callback )
    {
        var $el    = $( document.getElementById( id ) ),
            $title = $el.find( 'span' )
        
        this.api.update( id, props, function()
        {
            props.title && $title.text( props.title );
            props.url   && $el.attr( 'href', props.url );
            
            setTimeout( callback, 0 );
            
            ui.notify(
                'Bookmark \'' + $title.text() + '\' has been updated.'
            );
        } );
    };
    
} )( window.mdash, window.jQuery || window.Zepto );