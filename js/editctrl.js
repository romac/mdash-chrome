
// FIXME: Refactor!
// FIXME: Handle pressing alt while in edit mode.

( function( mdash, $ )
{
    
    var EditCtrl = mdash.EditCtrl = function( $btn, $bookmarks )
    {
        this.$docEl       = $( document.documentElement );
        this.$btn       = $btn;
        this.$bookmarks = $bookmarks;
        this.api        = chrome.bookmarks;
        this.editMode   = false;
    };
    
    EditCtrl.prototype.init = function()
    {
        var self = this;
        
        this.listenForAlt();
        this.setupButton();
        
        this.$docEl.on( 'click', '#bookmarks a:not(.add)', function( e )
        {
            if( self.editMode )
            {
                e.preventDefault();
                e.stopPropagation();
                
                var $el = $( e.target );
                
                if( !$el.is( 'a' ) )
                {
                    $el = $el.parent();
                }
                
                self.edit( $el );
            }
        } );
    };
    
    EditCtrl.prototype.setupButton = function()
    {
        var self = this;
        
        this.$btn.click( function()
        {
            if( self.altPressed ) return;
            
            if( self.editMode )
            {
                self.editMode = false;
                self.$docEl.removeClass( 'edit' );
                self.$btn.text( 'edit' );
            }
            else
            {
                self.editMode = true;
                self.$docEl.addClass( 'edit' );
                self.$btn.text( 'done' );
            }
        } );
    };
    
    EditCtrl.prototype.listenForAlt = function()
    {
        var $doc = $( document ),
            self = this;
        
        $doc.bind( 'keydown', function( e )
        {
            if( e.keyCode === 18 /* alt */ )
            {
                self.$docEl.addClass( 'edit' );
                self.editMode = self.altPressed = true;
            }
        } );
        
        $doc.bind( 'keyup', function( e )
        {
            if( e.keyCode === 18 /* alt */ )
            {
                self.$docEl.removeClass( 'edit' );
                self.editMode = self.altPressed = false;
            }
        } );
    };
    
    EditCtrl.prototype.edit = function( $b )
    {
        var $form, $title, $url, $section, $remove, dialog,
            self  = this,
            id    = $b.attr( 'id' ),
            title = $b.find( 'span' ).text(),
            sections = mdash.dashboard.manager.folder.children;
        
        $form  = $( '<div class="ui-edit-form">' );
        $title = $( '<input autofocus id="title" type="text"/>' ).val( title ).focus();
        $url   = $( '<input id="url" type="text"/>' ).val( $b.attr( 'href' ) );

        var sectionsSelectHtml = '<select id="section">';
        sections.forEach( function( section )
        {
            sectionsSelectHtml += '<option value="' + section.id + '">' + section.title + '</option>';
        } );
        sectionsSelectHtml += '</section>';
        $section = $( sectionsSelectHtml );

        $rmBtn = $( '<a class="remove" href="#">Remove</a>' ).click( function( e )
        {
            e.preventDefault();
            
            self.remove( id, function()
            {
                dialog.hide();
            } );
        } );
        
        $form.append( $title, $url, $section, $rmBtn );
        
        dialog = ui.confirm( 'Edit \'' + title + '\'', $form );
        dialog.overlay().ok( 'Save' );
        dialog.show( function( ok )
        {
            if( !ok )
            {
                dialog.hide();
                return;
            }

            self.update(
                id,
                {
                    title: $title.val(),
                    url  : $url.val()
                },
                function() { dialog.hide(); }
            );
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
                'Bookmark \'' + $el.find( 'span' ).text() + '\' has been removed.'
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
    
} )( window.mdash || ( window.mdash = {} ), window.jQuery || window.Zepto );