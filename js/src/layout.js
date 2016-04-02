(function(window, document, $, Layouts, undefined) {

  if(!window.LayoutApp) {
    window.LayoutApp = {};
  }

  window.LayoutApp = (function() {

    var CANVAS = 'canvas',
        MAX_IMAGES = Layouts.getImagesPerLayout(),
        MAX_MEASURE = Layouts.getCanvasMaxHeight(),

        images = [],
        canvases = [],
        measuresSet = false,
        measures = {
          width: MAX_MEASURE
        },

        layoutOptions = $('#layout-options'),
        gallery = $('#gallery'),
        camera,

        layouts = Layouts.getLayouts(),


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

        setImageMeasures = function(layout, targetCanvas) {
          if(Layouts.isVertical(layout)) {
            return {
              width: $(targetCanvas).width(),
              height: $(targetCanvas).height() / images.length
            };
          } else if(Layouts.isHorizontal(layout)) {
            return {
              width: $(targetCanvas).width() / images.length,
              height: $(targetCanvas).height()
            };
          } else if(layout.callback && layout.callback.constructor === 'Function') {
            return layout.callback(layout, targetCanvas, images);
          }

          return {
            width: $(targetCanvas).width(),
            height: $(targetCanvas).height()
          };
        },

        setTargetCoordinates = function(targetCanvas, layout, imageWidth, imageHeight, imageIndex) {
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

        /**
         * Fix to the intrinsic width as per:
         * http://stackoverflow.com/questions/3186150/image-draws-stretched-to-html-canvas-when-created-using-jquery
         */
        setUpCanvas = function(sourceCanvas) {
          var elem = $('<canvas>', {
                // width: sourceCanvas.width / 2,
                // height: sourceCanvas.height / 2
                width: measures.width,
                height: measures.height
              }),
              targetCanvas = elem[0];

          targetCanvas.width = measures.width;
          targetCanvas.height = measures.height;
          return targetCanvas;
        },

        /**
         * To ensure the correct ratio when drawing in the new canvas.
         */
        calculateCoeficient = function(targetCanvas, sourceCanvas) {
          return {
            width: sourceCanvas.width / targetCanvas.width,
            height: sourceCanvas.height / targetCanvas.height
          }
        },

        setSourceCoordinates = function(canvas, layout, imageWidth, imageHeight) {
          if(Layouts.isVertical(layout)) {
            return {
              x: 0,
              y: canvas.height / 2 - imageHeight / 2
            };
          } else if(Layouts.isHorizontal(layout)) {
            return {
              x: canvas.width / 2 - imageWidth / 2,
              y: 0
            };
          }

          // return {
          //   x: (imageWidth / canvases),
          //   y: (imageHeight / canvases)
          // };
        },

        updateLayouts = function(sourceCanvas) {
          layoutOptions.html('');

          for(var i = 0, layout; layout = layouts[i]; i++) {
            var targetCanvas = setUpCanvas(sourceCanvas),
                context = targetCanvas.getContext('2d'),
                imageMeasure = setImageMeasures(layout, targetCanvas);

            for(var j = 0, canvas; canvas = canvases[j]; j++) {
              var sourceCoordinates = setSourceCoordinates(targetCanvas, layout, imageMeasure.width, imageMeasure.height),
                  targetCoordinates = setTargetCoordinates(targetCanvas, layout, imageMeasure.width, imageMeasure.height, j),
                  coeficient = calculateCoeficient(targetCanvas, canvas);

              context.drawImage(canvas, sourceCoordinates.x, sourceCoordinates.y, imageMeasure.width * coeficient.width, imageMeasure.height * coeficient.height, targetCoordinates.x, targetCoordinates.y, imageMeasure.width, imageMeasure.height);
            }

            layoutOptions.append(targetCanvas);
          }
        },

        setCanvasMeasures = function(canvas) {
          measures.height = canvas.height * MAX_MEASURE / canvas.width;
        },

        updateView = function(canvas) {
          canvases.push(canvas);

          if(!measuresSet) {
            setCanvasMeasures(canvas);
            measuresSet = true;
          }

          updateGallery(canvas);

          if(canvases.length <= MAX_IMAGES) {
            updateLayouts(canvas);
          }
        },

        capture = function() {
          var snapshot = camera.capture();
          images.push(snapshot);
          snapshot.get_canvas(updateView);
        },

        download = function(e) {
          var canvas = e.target;
          window.open(canvas.toDataURL().replace("image/png", "image/octet-stream"));
        },

        bindEvents = function() {
          $('#camera-wrapper').on('click', '#shoot', capture);
          $('#layout-options').on('click', 'canvas', download)
        };

    return {
      init: function() {
        initCamera();
        bindEvents();
      }
    }

  })();

})(window, document, jQuery, window.LayoutApp.Layouts);
