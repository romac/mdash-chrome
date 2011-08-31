
( function( $, d, undefined )
{
    
    d._ = window.console.debug.bind( window.console );
    
    d.init = function()
    {
        d.initFontSize();
        d.initHelp();
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
                self.showHelp();
            }
        } );
    };
    
    d.initHelp = function()
    {
        $( '#help' ).bind( 'click', d.toggleHelp.bind( d ) );
    };
    
    d.showHelp = function()
    {
        $( '#getstarted' ).show();
        $( '#bookmarks' ).hide();
    };
    
    d.toggleHelp = function()
    {
        $( '#getstarted' ).toggle();
        $( '#bookmarks' ).toggle();
    };
    
    d.init();
    
} )( Zepto, this.Dashboard );
