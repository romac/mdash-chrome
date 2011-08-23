
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
        var self = this;
        
        this.manager.hasBookmarks( function( hasBoomarks )
        {
            if( hasBoomarks )
            {
                self.view = new d.View( $( '#bookmarks' ), self.manager );
                self.view.display();
            }
            else
            {
                self.showGetStarted();
            }
        } );
    };
    
    d.showGetStarted = function()
    {
        $( '#getstarted' ).show();
        $( '#bookmarks' ).hide();
    };
    
    d.init();
    
} )( Zepto, this.Dashboard );
