/* !
 * jQuery Image loader and responsive image replacement
 * Original author: https://github.com/christopher-weir
 * Licensed under the MIT license
 */
// eslint-disable-next-line
;( function ( $, window, document ) {

    var pluginName = 'ilnImageLoader';
    var currentView = null;
    var defaults = {
        breakpoint: 300,
        currentView: 'mobile'
    };


    function validateOptions( _options ) {

        if ( !_options.imageSmall ) {
            $.error( 'Please provide a small image' );
        }

        if ( !_options.imageLarge ) {
            $.error( 'Please provide a large image' );
        }

        return true;
    }

    // The actual plugin constructor
    function Plugin( element, options ) {
        var _this = this;
        _this.element = element;

        _this.options = $.extend( {}, defaults, options );

        validateOptions( _this.options );

        _this._defaults = defaults;
        _this._name = pluginName;

        _this.isMobile = function() {
            return $( window ).width() <= _this.options.breakpoint;
        };

        _this.loadImage = function( _img ) {

            var img = new Image();

            var loaded = function() {
                _this.element.src = _img;
            };

            img.addEventListener( 'load', loaded, false );
            img.src = _img;
        };

        _this.resize = function() {

            if ( _this.isMobile() ) {
                if( currentView === 'desktop' ) {
                    _this.loadImage( _this.options.imageSmall );
                    currentView = 'mobile';
                }
                return;
            }
            if( currentView === 'mobile' ) {
                _this.loadImage( _this.options.imageLarge );
                currentView = 'desktop';
            }
        };

        _this.init();
    }

    Plugin.prototype = {

        init: function() {

            var _this = this;

            if( _this.isMobile() ) {
                currentView = 'mobile';
                _this.loadImage( _this.options.imageSmall );
            }
            else {
                currentView = 'desktop';
                _this.loadImage( _this.options.imageLarge );
            }


            $( window ).resize( function() {
                _this.resize();
            } );
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each( function () {
            if ( !$.data( this, 'plugin_' + pluginName ) ) {
                $.data( this, 'plugin_' + pluginName,
                new Plugin( this, options ) );
            }
        } );
    };

// eslint-disable-next-line
} )( jQuery, window, document );
