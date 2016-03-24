(function(window, document, $) {

  window.layoutApp = (function() {

    var images = [],

        canvas = $('.layout-display'),
        camera = $('.camera'),
        photos = $('.photos'),

        initCamera = function() {
          if(!window.JpegCamera) {
            alert('Camera access is not available in your browser');
          } else {
            JpegCamera(camera).ready(function() {
            }).error(function() {
                alert('Camera access was denied');
            });
          }
        };

    return {
      init: function() {
        initCamera();
      }
    }

  });

})(window, document, jQuery);
