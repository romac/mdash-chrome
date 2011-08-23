
( function( $, d, undefined )
{
    
    
    d._ = window.console.debug.bind( window.console );
    
    d.init = function()
    {
        d.initFontSize();
        d.initManager();
    };
    
    d.initManager = function()
    {
        this.manager = new d.Manager();
        
        this.manager.initialize( this.initView.bind( this ) );
    };
    
    d.initFontSize = ( function()
    {
        var $sizes = $( '#fontSize > a' );
        
        return function()
        {
            if( localStorage.fontSize )
            {
                document.body.className = localStorage.fontSize;
                
                $sizes.removeClass( 'selected' );
                $sizes.parent().find( 'a[data-size="' + localStorage.fontSize + '"]' ).addClass( 'selected' );
            }
            
            $sizes.bind( 'click', function( e )
            {
                var $this = $( e.target );
                
                $this.siblings().removeClass( 'selected' );
                $this.addClass( 'selected' );
                
                document.body.className = localStorage.fontSize = $this.attr( 'data-size' );
            } );
        }
    } )();
    
    d.initView = function()
    {
        this.view = new d.View( $( '#bookmarks' ), this.manager );
        
        this.view.display();
    };
    
    d.init();
    
} )( Zepto, this.Dashboard );
