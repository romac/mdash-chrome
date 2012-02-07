
( function( mdash, $ )
{
    
    var Dashboard = mdash.Dashboard = function() {},
        proto     = Dashboard.prototype;
    
    Dashboard.VERSION = '0.7.1';
    
    proto.init = function()
    {
        ui.Dialog.effect = 'fade';
        
        this.$fontSizes  = $( '#fontctrl > a' );
        this.$helpCtrl   = $( '#helpctrl' );
        this.$editBtn    = $( '#edit' );
        this.$getStarted = $( '#getstarted' );
        this.$bookmarks  = $( '#bookmarks' );
        this.$version    = $( '#version' );
        
        this.manager  = new mdash.Manager(),
        this.fontCtrl = new mdash.FontCtrl( this.$fontSizes ),
        this.helpCtrl = new mdash.HelpCtrl( this.$helpCtrl, this.$getStarted, this.$bookmarks );
        this.editCtrl = new mdash.EditCtrl( this.$editBtn, this.$bookmarks );
        
        this.fontCtrl.init();
        this.helpCtrl.init();
        this.editCtrl.init();
        
        this.manager.init( this.loadBookmarks.bind( this ) );
    };
    
    proto.loadBookmarks = function()
    {
        var _this = this;
        
        this.leftColumn  = new mdash.Column( $( '#bookmarks > .left' ) );
        this.rightColumn = new mdash.Column( $( '#bookmarks > .right' ) );
        
        this.manager.getSections( 'left', function( sections )
        {
            _this.leftColumn.sections = sections;
            _this.leftColumn.render();
        } );
        
        this.manager.getSections( 'right', function( sections )
        {
            _this.rightColumn.sections = sections;
            _this.rightColumn.render();
        } );
    };
    
} )( window.mdash, window.jQuery || window.Zepto );
