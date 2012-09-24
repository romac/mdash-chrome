
( function( mdash )
{
    
    if( navigator.platform.indexOf( 'Win' ) !== -1 )
    {
        document.documentElement.classList.add( 'win' );
    }
    
    mdash.dashboard = new mdash.Dashboard();
    
    $( document ).ready( mdash.dashboard.init.bind( mdash.dashboard ) );
    
} )( window.mdash );
