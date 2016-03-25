(function(window, document, jQuery, undefined) {

  if(!window.LayoutApp) {
    window.LayoutApp = {};
  }

  window.LayoutApp.Layouts = (function() {

    var IMAGES_PER_LAYOUT = 4,
        CANVAS_MAX_MEASURE = 200,
        LAYOUT_TYPES = {
          HORIZONTAL: 'horizontal',
          VERTICAL: 'vertical'
        },
        LAYOUTS = [
          {
            type: LAYOUT_TYPES.VERTICAL
          },
          {
            type: LAYOUT_TYPES.HORIZONTAL
          },
          {
            callback: function(/* To be defined */) {
              return;
            }
          }
        ];

    return {

      getImagesPerLayout: function() {
        return IMAGES_PER_LAYOUT;
      },

      getCanvasMaxHeight: function() {
        return CANVAS_MAX_MEASURE;
      },

      getLayouts: function() {
        return LAYOUTS;
      },

      isHorizontal: function(layout) {
        return layout.type === LAYOUT_TYPES.HORIZONTAL;
      },

      isVertical: function(layout) {
        return layout.type === LAYOUT_TYPES.VERTICAL;
      }

    }

  })();

})(window, document, jQuery);
