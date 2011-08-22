
( function( global, chrome, d )
{
    // I know, UGLY, but it's just a prototype.
    // FIXME: Refactor, improve, rewrite from scrath, whatever but make it pretty and efficient ! 
    function View( $element, manager )
    {
        this.manager  = manager;
        this.$left    = $element.find( '.left' );
        this.$right   = $element.find( '.right' );
    }
    
    View.prototype.display = function()
    {
        var self = this;
        
        self.manager.getSections( function( sections )
        {
            sections.forEach( function( section )
            {
                var $column    = ( section.title.substring( 0, 1 ) === '+' ) ? self.$left : self.$right,
                    $s         = $( '<section></section>' );
                    $s[ 0 ].id = section.id;
                
                $s.append( '<h1>' + section.title.substring( 1 ) + '</h1>' );
                $column.append( $s );
                
                ( function( $section )
                {
                    self.manager.getBookmarks(
                        section,
                        function( bookmarks )
                        {
                            bookmarks.forEach( function( bookmark )
                            {
                                var $link = $( '<a>' + bookmark.title + '</a>' );
                                    $link.attr( {
                                        id : bookmark.id,
                                        href: bookmark.url
                                    } ),
                                    console.log( $link[ 0 ].origin );
                                var $img = $( '<img />' );
                                    $img.attr( {
                                        src: 'http://www.google.com/s2/favicons?domain=' + $link[ 0 ].host,
                                        alt: bookmark.title
                                    } );
                                
                                $link.prepend( $img );
                                $section.append( $link );
                            } );
                        }
                    );
                    
                } )( $s );
            } );
        } );
    }
    
    d.View = View;

} )( this, chrome, this.Dashboard = this.Dashboard || {} );

var $c = $( '#container' ), $s;

