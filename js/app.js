
( function( mdash, $ )
{
    
    $( document ).ready( function()
    {
        var manager  = new mdash.Manager(),
            fontCtrl = new mdash.FontCtrl( $( '#fontctrl > a' ) ),
            helpCtrl = new mdash.HelpCtrl( $( '#helpctrl' ), $( '#getstarted' ), $( '#bookmarks' ) );
        
        manager.init( function()
        {
            fontCtrl.init();
            helpCtrl.init();
            
            var leftColumn  = new mdash.Column( $( '#bookmarks > .left' ) ),
                rightColumn = new mdash.Column( $( '#bookmarks > .right' ) );
                
            manager.getSections( 'left', function( sections )
            {
                leftColumn.sections = sections;
                leftColumn.render();
            } );
            
            manager.getSections( 'right', function( sections )
            {
                rightColumn.sections = sections;
                rightColumn.render();
            } );
        } );
        
    } );
    
} )( window.mdash, Zepto );
