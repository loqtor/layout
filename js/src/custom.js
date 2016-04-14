(function(window, document, undefined) {

  if(!window.LayoutApp) {
    window.LayoutApp = {};
  }

  window.LayoutApp.Custom = (function() {

    var CUSTOM_LAYOUTS = [
      /**
      * Place your custom layouts as below
      */
      // ,
      // {
      //   setImageMeasures: function (layout, targetCanvas, imageIndex) {
      //     return {
      //       height: 0,
      //       width: 0
      //     }
      //   },
      //   setSourceCoordinates: function (canvas, layout, imageWidth, imageHeight, imageIndex) {
      //     return {
      //       x: 0,
      //       y: 0
      //     }
      //   },
      //   setTargetCoordinates: function (targetCanvas, layout, imageWidth, imageHeight, imageIndex) {
      //     return {
      //       x: 0,
      //       y: 0
      //     }
      //   }
      // }
    ];

    return {
      getCustomLayouts: function() {
        return CUSTOM_LAYOUTS;
      }
    }

  })();

})(window, document);
