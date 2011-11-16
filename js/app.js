
( function( mdash )
{
    
    if( navigator.platform.indexOf( 'Win' ) !== -1 )
    {
        document.documentElement.classList.add( 'win' );
    }
    
    var dashboard = new mdash.Dashboard();
    
    $( document ).ready( dashboard.init.bind( dashboard ) );
    
} )( window.mdash );
