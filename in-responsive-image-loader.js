/* !
 * jQuery Image loader and responsive image replacement
 * Original author: https://github.com/christopher-weir
 * Licensed under the MIT license
 */
// eslint-disable-next-line
;( function ( $, window, document ) {

    // Create the defaults once
    var pluginName = 'ilnImageLoader';
    var defaults = {
        breakpoint: 300,
        currentView: 'mobile'
    };
    var breakpoint = null;
    var currentView = null;

    var imageSmall = null;
    var imageLarge = null;

    var elm = null;

    // The actual plugin constructor
    function Plugin( element, options ) {

        this.element = element;
        elm = element;

        this.options = $.extend( {}, defaults, options );

        breakpoint = this.options.breakpoint;

        imageSmall = this.options.imageSmall;
        imageLarge = this.options.imageLarge;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }


    // return if is mobile or not
    function isMobile() {
        return $( window ).width() <= breakpoint;
    }


    function loadImage( _img ) {

        var img = new Image();

        var loaded = function() {
            elm.src = _img;
        };

        img.addEventListener( 'load', loaded, false );
        img.src = _img;
    }


    function resize() {
        if ( isMobile() ) {
            if( currentView === 'desktop' ) {
                loadImage( imageSmall );
                currentView = 'mobile';
            }
            return;
        }
        if( currentView === 'mobile' ) {
            loadImage( imageLarge );
            currentView = 'desktop';
        }
    }


    function validateOptions() {
        // $.error( 'now' );
        return true;
    }

    Plugin.prototype = {

        init: function() {
            validateOptions();

            if( isMobile() ) {
                currentView = 'mobile';
                loadImage( imageSmall );
            }
            else {
                currentView = 'desktop';
                loadImage( imageLarge );
            }


            $( window ).resize( function() {
                resize();
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
