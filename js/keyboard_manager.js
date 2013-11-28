( function( mdash )
{

        var KeyboardManager = mdash.KeyboardManager = function() {},
                proto       = KeyboardManager.prototype;

        proto.init = function()
        {
            this.searchTerm       = "";
            this.modifierPressed  = false;
            this.modifierKeyCodes = [
                93, // ⌘
                16  // Shift
            ];

            this.bindKeyboard();
        }

        proto.bindKeyboard = function()
        {
            var _this = this;

            $(document).on('keydown', function(e) {

                if (_this.isModifierKey(e.which))
                {
                    _this.modifierPressed = true;
                }
                else if (e.which == 8)
                {
                    // Backspace
                    if (_this.modifierPressed) {
                        _this.searchTerm = '';
                    } else {
                        _this.searchTerm = _this.searchTerm.slice(0, -1);
                    }
                }
                else
                {
                    if (e.which >= 65 && e.which <= 90)
                    {
                        _this.searchTerm += String.fromCharCode(e.which);
                    }
                }


                $('#filter p').text(_this.searchTerm);

                _this.filterTiles();
            });

            $(document).on('keyup', function(e) {
                if (_this.isModifierKey(e.which)) {
                    _this.modifierPressed = false;
                }
            });
    }

    proto.isModifierKey = function(keyCode)
    {
        return (this.modifierKeyCodes.indexOf(keyCode) !== -1);
    }

    proto.filterTiles = function()
    {
        var _this = this;
        var filterable = $('#bookmarks a').not('.add');

        $.each(filterable, function(i, item) {
            var $item = $(item);
            var title = $item.data('title');

            if (title.match(new RegExp('' + _this.searchTerm, 'i'))) {
                $item.show();
            } else {
                $item.hide();
            }
        });
    }


} )( window.mdash || ( window.mdash = {} ) );