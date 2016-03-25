(function(window, document, jQuery, undefined) {

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
            height: {
              value: CANVAS_MAX_MEASURE,
              divider: IMAGES_PER_LAYOUT
            },
            width: {
              value: ALL
            },
            type: LAYOUT_TYPES.VERTICAL
          },
          {
            height: {
              value: ALL
            },
            width: {
              value: CANVAS_MAX_MEASURE,
              divider: IMAGES_PER_LAYOUT
            },
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
        return LAYOUTS;
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

})(window, document, jQuery);
