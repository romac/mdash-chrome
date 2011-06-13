
( function( $, d, undefined )
{
    window._ = console.debug.bind( console );
    
    var m = new d.Manager( '[Dashboard]', d.Finder );
    
    m.initialize( init );
    
    function init()
    {
        console.log( 'Under (not that heavy) development. Stay tuned.' );
    }
    
} )( Zepto, this.Dashboard );
