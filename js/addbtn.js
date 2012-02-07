
( function( mdash )
{
    
    var _getForm = function()
    {
        var $form  = $( '<div class="ui-add-form"></div>' ),
            $title = $( '<input autofocus id="title" type="text" placeholder="Title..." />' ),
            $url   = $( '<input id="url" type="text" placeholder="http://www.example.com" />' );
        
        $form.append( $title, $url );
        
        return $form;
    };
    
    var AddBtn = mdash.AddBtn = function( $btn )
    {
        this.$btn     = $btn;
        this.$section = $btn.closest( 'section' );
        this.api        = chrome.bookmarks;
    };
    
    AddBtn.prototype.init = function()
    {
        this.$btn.bind( 'click', this.showModal.bind( this ) );
    };
    
    AddBtn.prototype.showModal = function( e )
    {
        var self = this, $form = _getForm();
        
        e.preventDefault();
        
        var modal = ui.confirm(
            'Add a bookmark in \'' + this.$section.find( 'h1' ).text() + '\'',
            $form
        ).ok( 'Add' );
        
        modal.show( function( ok )
        {
            if( !ok ) return;
            
            self.add(
                $form.find( '#title' ).val(),
                $form.find( '#url' ).val(),
                function( added, bookmark )
                {
                    if( !added )
                    {
                        ui.error( 'Error', 'Couldn\'t add the bookmark.' );
                        
                        modal.show();
                        return;
                    }
                    
                    ui.notify( 'Added \'' + bookmark.title + '\'.' );
                    
                    self.$btn.before(
                        mdash.Column.prototype.renderBookmark( bookmark )
                    );
                }
            );
        } );
    };
    
    AddBtn.prototype.add = function( title, url, callback )
    {
        this.api.create( {
            parentId: this.$section.attr( 'id' ),
            title: title,
            url: url,
            index: this.$section.children().length - 2
        },
        function( result )
        {
            callback && setTimeout( function() { callback( !!result, result ); }, 0 );
        } );
    };
    
} )( window.mdash );