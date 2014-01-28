var app = {};


// ---------------------------------------------------------------------------

app.background = {

  initialize: function(){
    // variables
    this.el = $(".background");
    this.count = this.el.data("count");
    this.delay = this.el.data("delay");
    this.baseHeight = this.el.data("height");
    this.baseWidth = this.el.data("width");
    this.slides = this.el.data("slides");
    this.image = this.el.data("image");
    this.isMobile = (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent);

    // event handlers
    $(window).resize(function(){
      app.background.dimensions();
    });

    // attach default image
    this.el.css("background-image", "url(" + this.image + ")");

    // don't attempt to animate if on a mobile device
    // iOS won't even display the image due to the large dimensions
    if (this.isMobile) {
      this.dimensions();
    } else {
      this.el.css("background-image", "url(" + this.slides + ")");
      this.dimensions();
      this.sequence();
    }

  },



  dimensions: function(){

    // determine the size of the window
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    // determine which dimension has to scale the most to fill the window
    var widthRatio = windowWidth / this.baseWidth;
    var heightRatio = windowHeight / this.baseHeight;
    this.currentRatio = heightRatio > widthRatio ? heightRatio : widthRatio;

    // save new dimensions based on the size needed to fill the window
    this.currentWidth = Math.ceil(this.baseWidth * this.currentRatio);
    this.currentHeight = Math.ceil(this.baseHeight * this.currentRatio);
    this.currentTotalWidth = this.currentWidth * this.count;
    var currentHeightInPixels = this.currentHeight + "px";
    var currentWidthInPixels = this.currentWidth + "px";
    var currentTotalWidthInPixels = this.currentTotalWidth + "px";

    // dimensions differ dependent on if we are sequencing
    if (this.isMobile) {
      var currentDimensions = currentWidthInPixels + " " + currentHeightInPixels;
    } else {
      var currentDimensions = currentTotalWidthInPixels + " " + currentHeightInPixels;
    }

    // set the background-size based on the necessary dimensions
    this.el.css('background-size', currentDimensions);

    // since one dimension may exceed the window, center the image using
    // the offset (if one exists)
    this.currentOffsetX = 0
    this.currentOffsetY = 0

    if (this.currentWidth > windowWidth) {
      this.currentOffsetX = -Math.abs((this.currentWidth - windowWidth) / 2)
      this.el.css('background-position-x', this.currentOffsetX + "px")
    }

    if (this.currentHeight > windowHeight) {
      this.currentOffsetY = -Math.abs((this.currentHeight - windowHeight) / 2)
      this.el.css('background-position-y', this.currentOffsetY + "px")
    }

    // turn this on if you want logs in development
    if (false) {
      console.log("windowWidth: " + windowWidth)
      console.log("windowHeight: " + windowHeight)
      console.log("widthRatio: " + widthRatio)
      console.log("heightRatio: " + heightRatio)
      console.log("currentRatio: " + this.currentRatio)
      console.log("currentWidth: " + this.currentWidth)
      console.log("currentHeight: " + this.currentHeight)
      console.log("currentTotalWidth: " + this.currentTotalWidth)
      console.log("currentDimensions: " + currentDimensions)
    }

  },

  sequence: function(){
    this.index = 0
    setInterval(function(){ app.background.swap(); }, app.background.delay);
  },

  swap: function(){
    if (this.index == 0) {
      var newPosition = this.currentOffsetX + "px"
      this.el.css("background-position-x", newPosition);
    } else {
      var currentPosition = this.el.css("background-position-x");
      var newPosition = currentPosition.replace(/px/,"") - (this.currentWidth);
      this.el.css("background-position-x", newPosition);
    }
    this.index++
    if (this.index == this.count) this.index = 0
  }

};


// ---------------------------------------------------------------------------

$(function(){
  app.background.initialize();
});

