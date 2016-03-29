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
          gallery.append($(canvas).height(200));
        },

        // setImageHeight = function(layout, canvas) {
        //   if(Layouts.isAll(layout.height.value)) {
        //     return $(canvas).height();
        //   }
        //
        //   return layout.height.value / layout.height.divider;
        // },
        //
        // setImageWidth = function(layout, canvas) {
        //   if(Layouts.isAll(layout.width.value)) {
        //     return $(canvas).width();
        //   }
        //
        //   return layout.width.value / layout.width.divider;
        // },
        //
        // setImageCoordinates = function(canvas, layout, imageHeight, imageWidth, imageIndex) {
        //   if(Layouts.isHorizontal(layout)) {
        //     return {
        //       x: imageIndex * imageHeight,
        //       y: 0
        //     }
        //   } else if(Layouts.isVertical(layout)) {
        //     return {
        //       x: 0,
        //       y: imageIndex * imageHeight
        //     }
        //   }
        //
        //   return {
        //     x: 0,
        //     y: 0
        //   }
        // },

        setImageHeight = function(layout, targetCanvas) {
          if(Layouts.isVertical(layout)) {
            return $(targetCanvas).height() / images.length;
          } else if(Layouts.isHorizontal(layout)) {
            return $(targetCanvas).height();
          } else if(layout.callback && layout.callback.constructor === 'Function') {
            layout.callback();
          }

          return $(targetCanvas).height();
        },

        setImageWidth = function(layout, targetCanvas) {
          if(Layouts.isVertical(layout)) {
            return $(targetCanvas).width();
          } else if(Layouts.isHorizontal(layout)) {
            return $(targetCanvas).width() / images.length;
          } else if(layout.callback && layout.callback.constructor === 'Function') {
            layout.callback();
          }

          return $(targetCanvas).width();
        },

        setImageCoordinates = function(targetCanvas, layout, imageHeight, imageWidth, imageIndex) {
          if(Layouts.isVertical(layout)) {
            return {
              x: 0,
              y: imageHeight * imageIndex
            };
          } else if(Layouts.isHorizontal(layout)) {
            return {
              x: imageWidth * imageIndex,
              y: 0
            };
          }
        },

        updateLayouts = function(canvas) {
          // ctx.drawImage(image, dx, dy, dWidth, dHeight);
          layoutOptions.html('');

          for(var i = 0, layout; layout = layouts[i]; i++) {
            var elem = $("<canvas>", {width:MAX_MEASURE, height:MAX_MEASURE});
            var targetCanvas = elem[0];
            targetCanvas.width = targetCanvas.height = MAX_MEASURE;

            var context = targetCanvas.getContext('2d');

            for(var j = 0, image; image = images[j]; j++) {
              var imageHeight = setImageHeight(layout, targetCanvas),
                  imageWidth = setImageWidth(layout, targetCanvas),
                  coordinates = setImageCoordinates(targetCanvas, layout, imageHeight, imageWidth, j);

              context.drawImage(image._canvas, coordinates.x, coordinates.y, imageWidth, imageHeight);
            }

            layoutOptions.append(targetCanvas);
          }
        },

        /**
         * To be completed
         */
        updateImages = function(snapshot) {
          newImages = [];

          for(var i = 0, image; image = images[i]; i++) {
            newImages.push(image);
          }

          if(newImages.length < MAX_IMAGES) {

          }

          images = newImages;
        },

        updateView = function(canvas) {
          $(canvas).height(MAX_MEASURE);
          $(canvas).width(MAX_MEASURE);
          updateGallery(canvas);
          updateLayouts(canvas);
        },

        capture = function() {
          var snapshot = camera.capture();

          if(images.length < MAX_IMAGES) {
            // updateImages(snapshot);
            images.push(snapshot);
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
