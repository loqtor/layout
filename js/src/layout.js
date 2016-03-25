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

        setImageHeight = function(layout, canvas) {
          if(Layouts.isAll(layout.height.value)) {
            return $(canvas).height();
          }

          return layout.height.value / layout.height.divider;
        },

        setImageWidth = function(layout, canvas) {
          if(Layouts.isAll(layout.width.value)) {
            return $(canvas).width();
          }

          return layout.width.value / layout.width.divider;
        },

        setImageCoordinates = function(canvas, layout, imageHeight, imageWidth, imageIndex) {
          if(Layouts.isHorizontal(layout)) {
            return {
              x: imageIndex * imageHeight,
              y: 0
            }
          } else if(Layouts.isVertical(layout)) {
            return {
              x: 0,
              y: imageIndex * imageHeight
            }
          }

          return {
            x: 0,
            y: 0
          }
        },

        updateLayouts = function(canvas) {
          // ctx.drawImage(image, dx, dy, dWidth, dHeight);
          layoutOptions.html('');

          for(var i = 0, layout; layout = layouts[i]; i++) {
            var canvas = document.createElement(CANVAS),
                context = canvas.getContext('2d');

            $(canvas).height(MAX_MEASURE);
            $(canvas).width(150); // @Todo: Improve this

            for(var j = 0, image; image = images[j]; j++) {
              var imageHeight = setImageHeight(layout, canvas),
                  imageWidth = setImageWidth(layout, canvas),
                  coordinates = setImageCoordinates(canvas, layout, imageHeight, imageWidth, j);

              context.drawImage(image._canvas, coordinates.x, coordinates.y, imageWidth, imageHeight);
            }

            layoutOptions.append(canvas);
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
