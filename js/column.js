
( function( mdash )
{
    
    mdash.links = {};
    
    var Column = mdash.Column = function( $el )
    {
        this.$el      = $el;
        this.sections = null;
    },
    proto = Column.prototype;
    
    proto.render = function()
    {
        var _this = this;
        
        this.$el.empty();
        
        this.sections.forEach( function( section )
        {
            _this.$el.append( _this.renderSection( section ) );
        } );
    };
    
    proto.renderSection = function( section )
    {
        var _this    = this,
            $section = ich.section( section );
        
        section.children.forEach( function( bookmark )
        {
            var $link = _this.renderBookmark( bookmark );
            $section.append( $link );
            mdash.links[ $link.attr( 'href' ) ] = $link;
        } );
        
        var $addBtn = ich.bookmark( {
            id        : ( this.sections.length + 1 ) + '-section-add',
            className : 'add',
            title     : '+',
            url       : '#add',
            favicon   : 'chrome://favicon/default'
        } );
        
        $section.append( $addBtn );
        $section.data.addBtn = new mdash.AddBtn( $addBtn );
        $section.data.addBtn.init();
        
        return $section;
    };
    
    proto.renderBookmark = function( bookmark )
    {
        var link = document.createElement( 'a' );
        
        link.href = bookmark.url;
        
        var data = {
            id      : bookmark.id,
            title   : bookmark.title,
            url     : link.href,
            favicon : bookmark.favicon ? bookmark.favicon : 'chrome://favicon/' + link.origin
        };
        
        return ich.bookmark( data );
    };

} )( window.mdash || ( window.mdash = {} ) );
