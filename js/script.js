
( function( $, d, undefined )
{
    window._ = console.debug.bind( console );
    
    var m = new d.Manager( 'Other Bookmarks/A/B/C/[Dashboard]', d.Finder );
    
    m.initialize( init );
    
    function init( manager )
    {
        console.log( 'Under (not that heavy) development. Stay tuned.' );
        
        console.debug( manager.root );
    }
    
} )( Zepto, this.Dashboard );
