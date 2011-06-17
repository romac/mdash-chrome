
( function( $, d, undefined )
{
    d._ = window.console.debug.bind( window.console );
    
    var m = new d.Manager();
    
    m.initialize( initialized );
    
    function initialized()
    {
        var $c = $( '#container' ), $s;
        
        m.getSections( function( sections )
        {
            sections.forEach( function( section )
            {
                $s = $( '<section></section>' );
                
                $s.append( '<h1>' + section.title + '</h1>' );
                $c.append( $s );
                
                ( function( $section )
                {
                    m.getBookmarks(
                        section,
                        function( bookmarks )
                        {
                            bookmarks.forEach( function( bookmark )
                            {
                                var $a = $( '<a>' + bookmark.title + '</a>' );
                                    $a.attr( 'href', bookmark.url );
                                    
                                $section.append( $a );
                            } );
                        }
                    );
                    
                } )( $s );
            } );
        } );
    }
    
} )( Zepto, this.Dashboard );
