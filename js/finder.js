
( function( d )
{
    
    d.Finder = Finder;
    
    function Finder( tree )
    {
        this.tree = tree;
    }
    
    Finder.TYPE = {
        UNDEF    : 0,
        FOLDER   : 'folder',
        BOOKMARK : 'bookmark'
    };
    
    Finder.prototype = {
        
        findByPath : function( path, type, tree )
        {
            var parts   = path.split( '/' ),
                tree    = tree || this.tree
                cur     = tree,
                part    = null,
                folder  = null;
            
            while( parts.length )
            {
                part = parts.shift();
                
                if( !part )
                {
                    continue;
                }
                
                cur = this.findBy( 'title', part, Finder.TYPE.UNDEF, cur );
                
                if( !cur )
                {
                    return null;
                }
                
                if( type && type === Finder.TYPE.FOLDER && !cur.children )
                {
                    continue;
                }
                
                if( type && type === Finder.TYPE.BOOKMARK && cur.children  )
                {
                    continue;
                }
            }
            
            return cur;
        },
        
        findBy : function( prop, value, type, tree )
        {
            var child, i;
            
            tree = tree || this.tree;
            
            if( !value || !tree || !tree.children )
            {
                return;
            }
            
            if( prop === 'path' )
            {
                return this.findByPath( value, type, tree );
            }
            
            for( i = 0; i < tree.children.length; i++ )
            {
                child = tree.children[ i ];
                
                if( child[ prop ] && child[ prop ] === value )
                {
                    if( type && type === Finder.TYPE.FOLDER && !child.children )
                    {
                        return null;
                    }
                    
                    if( type && type === Finder.TYPE.BOOKMARK && child.children  )
                    {
                        return null;
                    }
                    
                    return child;
                }
            }
            
            return null;
        },
    }
    
} )( this.Dashboard = this.Dashboard || {} );
