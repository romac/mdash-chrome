
( function( exports )
{
    var Column = exports.Column = function( $element )
    {
        this.$el      = $el;
        this.sections = null;
    },
    proto = Column.prototype;
    
    proto.render = function()
    {
        var _this = this,
            html  = '';
        
        this.sections.forEach( function( section )
        {
            html += _this.renderSection( section );
        } );
        
        this.$el.html( html );
    };
    
    proto.renderSection = function( section )
    {
        var _this = this,
            bookmarksHtml = '';
        
        section.children.forEach( function( bookmark )
        {
            bookmarksHtml += _this.renderBookmark( bookmark );
        } );
        
        return ich.section( {
            title     : section.title,
            bookmarks : bookmarksHtml
        } );
    };
    
    proto.renderBookmark = function( bookmark )
    {
        var link = document.createElement( 'a' );
        
        link.href = bookmark.url;
        
        var data = {
            id      : bookmark.id,
            title   : bookmark.title,
            url     : link.href,
            favicon : 'chrome://favicon/' + link.href.origin
        };
        
        return ich.bookmark( data );
    };

} )( window.mdash );
