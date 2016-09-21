/* !
 * jQuery Image loader and responsive image replacement
 * Original author: https://github.com/christopher-weir
 * Licensed under the MIT license
 */
// eslint-disable-next-line
;( function ( $, window, document ) {

    var pluginName = 'ilnImageLoader';
    var defaults = {
        breakpoint: 300,
        speed: 400,
        currentView: 'mobile'
    };


    function validateOptions( _options ) {

        if ( !_options.lores ) {
            $.error( 'Please provide a small image' );
        }

        if ( !_options.hires ) {
            $.error( 'Please provide a large image' );
        }

        return _options;
    }

    // The actual plugin constructor
    function Plugin( element ) {

        var plugin = this;

        var firstLoad = true;
        var _data = $( element ).data();

        plugin.options = $.extend( {}, defaults, validateOptions( _data ) );

        plugin.element = element;
        plugin.currentView = null;
        plugin._defaults = defaults;
        plugin._name = pluginName;


        plugin.isMobile = function() {
            return $( window ).width() <= this.options.breakpoint;
        };


        plugin.loadImage = function( _img ) {

            var img = new Image();
            var speed = this.options.speed;
            var elm = this.element;

            var loaded = function() {
                elm.src = _img;
                if ( firstLoad ) {
                    firstLoad = false;
                    $( elm ).fadeIn( speed );
                }
            };

            img.addEventListener( 'load', loaded, false );
            img.src = _img;
        };


        plugin.resize = function() {

            if ( this.isMobile() ) {
                if( this.currentView === 'desktop' ) {
                    this.loadImage( this.options.lores );
                    this.currentView = 'mobile';
                }
                return;
            }
            if( this.currentView === 'mobile' ) {
                this.loadImage( this.options.hires );
                this.currentView = 'desktop';
            }
        };

        plugin.init();
    }

    Plugin.prototype = {

        init: function() {

            var _this = this;

            if( _this.isMobile() ) {
                _this.currentView = 'mobile';
                _this.loadImage( _this.options.lores );
            }
            else {
                _this.currentView = 'desktop';
                _this.loadImage( _this.options.hires );
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
