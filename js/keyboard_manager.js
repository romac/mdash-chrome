
( function( mdash )
{

        var ENABLED = 'mdash:keyboard:isEnabled';

        var KeyboardManager = mdash.KeyboardManager = function() {},
                proto       = KeyboardManager.prototype;

        // TODO: Use ES5 getter/setter.
        proto.enable = function()
        {
            localStorage[ENABLED] = "enabled";
        };

        proto.disable = function()
        {
            localStorage[ENABLED] = "enabled";
        };

        proto.toggle = function()
        {
            localStorage[ENABLED] = (localStorage[ENABLED] === 'enabled') ? 'disabled' : 'enabled';
        };

        proto.isEnabled = function()
        {
            return localStorage[ENABLED] === "enabled";
        };

        proto.init = function()
        {
            this.searchTerm       = "";
            this.modifierPressed  = false;
            this.modifierKeyCodes = [
                91, // ⌘
                16  // Shift
            ];

            if (localStorage[ENABLED] == null) {
                this.enable();
            }

            // this.bindKeyboard();
        }

        proto.bindKeyboard = function()
        {
            var _this = this;

            $(document).on('keydown', function(e) {

                if (!_this.isEnabled()) {
                    return;
                }

                if (_this.isModifierKey(e.which))
                {
                    _this.modifierPressed = true;
                }
                else if (e.which == 8)
                {
                    // Backspaces
                    if (_this.modifierPressed) {
                        _this.searchTerm = '';
                    } else {
                        _this.searchTerm = _this.searchTerm.slice(0, -1);
                    }

                    // Prevents the address bar from getting focus
                    e.preventDefault();
                }
                else
                {
                    if (/*!_this.modifierPressed &&*/ e.which >= 65 && e.which <= 90)
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
