
( function( exports )
{
    
    var HelpCtrl = exports.HelpCtrl = function( $handle, $help, $interface )
    {
        this.$handle    = $handle;
        this.$help      = $help;
        this.$interface = $interface;
    };
    
    HelpCtrl.prototype.init = function()
    {
        this.$handle.click( this.toggle.bind( this ) );
    };
    
    HelpCtrl.prototype.toggle = function()
    {
        this.$help.toggle();
        this.$interface.toggle();
    };
    
    HelpCtrl.prototype.show = function()
    {
        this.$help.show();
        this.$interface.hide();
    };
    
    HelpCtrl.prototype.hide = function()
    {
        this.$help.hide();
        this.$interface.show();
    };
    
} )( window );
