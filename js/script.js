
( function( $, d, undefined )
{
    d._ = window.console.debug.bind( window.console );
    
    var m = new d.Manager();
    
    m.initialize( function()
    {
        var v = new d.View( $( '#bookmarks' ), m );
        
        v.display();
        
        $( '.plus' ).bind( 'click', function( e )
        {
            var $target = $( e.target ),
                $col    = $( '#bookmarks' ).find( $target.data( 'el' ) );
                
            
        } );
        
    } );
    
} )( Zepto, this.Dashboard );
