
( function( mdash )
{
    
    var EditCtrl = mdash.EditCtrl = function( $btn, $bookmarks )
    {
        this.$btn = $btn;
        this.$bookmarks = $bookmarks;
    };
    
    EditCtrl.prototype.init = function()
    {
        this.$btn.bind( 'click', this.toggleEdit.bind( this ) );
    };
    
    EditCtrl.prototype.toggleEdit = function( e )
    {
        e.preventDefault();
        
        this.$bookmarks.toggleClass( 'edit' );
        this.$btn.html( this.$bookmarks.hasClass( 'edit' ) ? 'done' : 'edit' );
    };
    
} )( window.mdash );