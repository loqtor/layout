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
      //   setImageMeasures: function() {
      //     return {
      //       height: 0,
      //       width: 0
      //     }
      //   },
      //   setSourceCoordinates: function() {
      //     return {
      //       x: 0,
      //       y: 0
      //     }
      //   },
      //   setTargetCoordinates: function() {
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
