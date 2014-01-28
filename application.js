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
    this.image = this.el.data("image");

    // event handlers
    $(window).resize(function(){
      app.background.newDimensions();
    })

    // set up
    this.el.css("background-image", "url(" + this.image + ")");
    this.newDimensions();
    this.sequence();
  },

  newDimensions: function(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var widthRatio = windowWidth / this.baseWidth;
    var heightRatio = windowHeight / this.baseHeight;
    this.currentRatio = heightRatio > widthRatio ? heightRatio : widthRatio;
    this.currentWidth = Math.ceil(this.baseWidth * this.currentRatio);
    this.currentHeight = Math.ceil(this.baseHeight * this.currentRatio);
    this.currentTotalWidth = this.currentWidth * this.count;
    var currentHeightInPixels = this.currentHeight + "px";
    var currentTotalWidthInPixels = this.currentTotalWidth + "px";
    var currentDimensions = currentTotalWidthInPixels + " " + currentHeightInPixels;
    this.el.css('background-size', currentDimensions);

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

    if (true) {
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

