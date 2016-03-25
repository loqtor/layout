(function(window, document, $, Layouts, undefined) {

  if(!window.LayoutApp) {
    window.LayoutApp = {};
  }

  window.LayoutApp = (function() {

    var images = [],

        layoutOptions = $('#layout-options'),
        gallery = $('#gallery'),
        camera,

        layouts = Layouts.getLayouts(),

        CANVAS = 'canvas',
        MAX_IMAGES = Layouts.getImagesPerLayout(),
        MAX_MEASURE = Layouts.getCanvasMaxHeight(),

        initCamera = function() {
          if(!window.JpegCamera) {
            alert('Camera access is not available in your browser');
          } else {
            camera = new JpegCamera('#camera').ready(function() {

            }).error(function() {
                alert('Camera access was denied');
            });
          }
        },

        updateGallery = function(canvas) {
          gallery.append(canvas);
        },

        setVerticalLayoutData = function(destinationCanvas, imageQty, imageIndex) {
          return {
            sourceX: 0,
            sourceY: destinationCanvas.height() / imageQty,
            sourceWidth: destinationCanvas.width(),
            sourceHeight: destinationCanvas.height() / imageQty,
            destinationX: 0,
            destinationY: destinationCanvas.height() / imageQty * (imageIndex + 1),
            destinationWidth: destinationCanvas.width(),
            destinationHeight: destinationCanvas.height() / imageQty * (imageIndex + 1)
          }
        },

        setHorizontalLayoutData = function(destinationCanvas, imageQty, imageIndex) {

        },

        updateLayouts = function(canvas) {
          // ctx.drawImage(image, dx, dy, dWidth, dHeight);
          layoutOptions.html('');

          for(var i = 0, layout; layout = layouts[i]; i++) {
            var destinationCanvas = document.createElement(CANVAS),
                context = destinationCanvas.getContext('2d');

            $(destinationCanvas).height(MAX_MEASURE);
            $(destinationCanvas).width(MAX_MEASURE);

            for(var j = 0, image; image = images[j]; j++) {
              var imageData = {};

              if(Layouts.isVertical(layout)) {
                imageData = setVerticalLayoutData(destinationCanvas, images.length, j);
              } else if(Layouts.isHorizontal(layout)) {
                // imageData = setHorizontalLayoutData(destinationCanvas, images.length, j);
              } else if(layout.callback) {
                /**
                 * Execute layout callback here
                 */
              }

              if(imageData.sourceX) {
                context.drawImage(canvas, imageData.sourceX, imageData.sourceY, imageData.sourceWidth, imageData.sourceHeight, imageData.destinationX, imageData.destinationY, imageData.destinationWidth, imageData.destinationHeight);
              }
            }

            layoutOptions.append(destinationCanvas);
          }
        },

        updateView = function(canvas) {
          updateGallery(canvas);
          updateLayouts(canvas);
        },

        capture = function() {
          var snapshot = camera.capture();

          if(images.length < MAX_IMAGES) {
            snapshot.get_canvas(updateView);
          }
        },

        bindEvents = function() {
          $('#camera-wrapper').on('click', '#shoot', capture);
        };

    return {
      init: function() {
        initCamera();
        bindEvents();
      }
    }

  })();

})(window, document, jQuery, window.LayoutApp.Layouts);
