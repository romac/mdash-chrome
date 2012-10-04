
( function( mdash )
{
    
    var FontCtrl = mdash.FontCtrl = function( $sizes )
    {
        this.$sizes = $sizes;
    };
    
    FontCtrl.prototype.init = function()
    {
        var size;
        
        if( size = localStorage.fontSize )
        {
            document.body.className = size;
            
            this.select( size );
        }
        
        this.$sizes.bind( 'click', this.sizeSelected.bind( this ) );
    };
    
    FontCtrl.prototype.select = function( size )
    {
        this.$sizes.removeClass( 'selected' );
        this.$sizes.parent().find( 'a[data-size="' + size + '"]' ).addClass( 'selected' );
    };
    
    FontCtrl.prototype.sizeSelected = function( e )
    {
        var $this = $( e.target );
        
        $this.siblings().removeClass( 'selected' );
        $this.addClass( 'selected' );
        
        document.body.className = localStorage.fontSize = $this.attr( 'data-size' );
    };
    
} )( window.mdash || ( window.mdash = {} ) );