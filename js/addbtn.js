
( function( mdash )
{
    
    var AddBtn = mdash.AddBtn = function( $btn )
    {
        this.$btn = $btn;
    };
    
    AddBtn.prototype.init = function()
    {
        this.$btn.bind( 'click', this.showModal.bind( this ) );
    };
    
    AddBtn.prototype.showModal = function( e )
    {
        e.preventDefault();
        
        
    };
    
} )( window.mdash );