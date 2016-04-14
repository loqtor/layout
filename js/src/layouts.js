(function(window, document, jQuery, Custom, undefined) {

  if(!window.LayoutApp) {
    window.LayoutApp = {};
  }

  window.LayoutApp.Layouts = (function() {

    var IMAGES_PER_LAYOUT = 4,
        CANVAS_MAX_MEASURE = 200,
        ALL = 'all',
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
        return LAYOUTS.concat(Custom.getCustomLayouts());
      },

      isAll: function(value) {
        return value === ALL;
      },

      isHorizontal: function(layout) {
        return layout.type === LAYOUT_TYPES.HORIZONTAL;
      },

      isVertical: function(layout) {
        return layout.type === LAYOUT_TYPES.VERTICAL;
      }

    }

  })();

})(window, document, jQuery, window.LayoutApp.Custom);
