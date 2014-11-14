$.Thumbnail = function (el) { 
  this.$el = $(el);
  this.$activeImage = $(".gutter-images img:first-child");
  this.activate(this.$activeImage);
  this.$el.on("click", ".gutter-images img", this.handleActivation.bind(this));
  this.$el.on("mouseenter", ".gutter-images img",
              this.handleMouseEnter.bind(this));
  this.$el.on("mouseleave", ".gutter-images img",
              this.handleMouseLeave.bind(this));
              
  this.gutterIdx = 4;
  this.$images = $(".gutter-images img");
  this.fillGutterImages();
  this.countImages = this.$images.size();
  this.$el.on("click", ".gutter a:first-child", this.prevImage.bind(this));
  this.$el.on("click", ".gutter a:last-child", this.nextImage.bind(this));
};

$.fn.thumbnail = function () {
  return this.each(function () {
    new $.Thumbnail(this);
  });
};

$.Thumbnail.prototype.prevImage = function() {
  this.showImage(-1);
}

$.Thumbnail.prototype.nextImage = function() {
  this.showImage(1);
}

$.Thumbnail.prototype.showImage = function(dir) {
  if (this.gutterIdx + dir < 0 || this.gutterIdx + dir > this.countImages - 5) {
    return
  } 
  this.gutterIdx += dir;
  this.fillGutterImages();
}

$.Thumbnail.prototype.fillGutterImages = function() {
  var $gutterImages = $(".gutter-images");
  $gutterImages.empty();
  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    $gutterImages.append(this.$images[i]);
  }
}

$.Thumbnail.prototype.handleMouseEnter = function(event) {
  var $image = $(event.currentTarget);
  var $cloneImage = $image.clone();
  this.activate($cloneImage);
}

$.Thumbnail.prototype.handleMouseLeave = function(event) {
  this.activate(this.$activeImage);
}

$.Thumbnail.prototype.handleActivation = function(event) {
  this.$activeImage = $(event.currentTarget);
  var $cloneImage = this.$activeImage.clone();
  this.activate($cloneImage);
}

$.Thumbnail.prototype.activate = function($img) {
  var $activeEl = $(".active");
  var $image = $img.clone();
  $activeEl.empty();
  $activeEl.append($image);
}



