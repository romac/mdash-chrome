
( function( global, chrome, d )
{
    // I know, UGLY, but it's just a prototype.
    function View( $element, manager )
    {
        this.manager  = manager;
        this.$element = $element;
    }
    
    View.prototype.display = function()
    {
        var self = this;
        
        self.manager.getSections( function( sections )
        {
            sections.forEach( function( section )
            {
                $s = $( '<section></section>' );
                
                $s.append( '<h1>' + section.title + '</h1>' );
                self.$element.append( $s );
                
                ( function( $section )
                {
                    self.manager.getBookmarks(
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
    
    d.View = View;

} )( this, chrome, this.Dashboard = this.Dashboard || {} );

var $c = $( '#container' ), $s;

