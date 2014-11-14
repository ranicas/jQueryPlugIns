$.Carousel = function (el) { 
  this.$el = $(el);
  this.activeIdx = 1;
  this.count = $("div.items img").size();
  this.transitioning = false;
  $("div.items img:first-child").addClass("active");
  $("div.items img:last-child").addClass("prev");
  $("div.items img:nth-child(2)").addClass("next");
  $(".slide-prev").on("click", this.slidePrev.bind(this));
  $(".slide-next").on("click", this.slideNext.bind(this));
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$.Carousel.prototype.slidePrev = function () {
  this.slide(-1);
};

$.Carousel.prototype.slideNext = function () {
  this.slide(1);
};

function getIdx(idx, dir) {
  idx += dir;
  if (idx <= 0) {
    idx = this.count;
  } else if (idx > this.count) {
    idx = 1;
  }
  
  return idx;
}

$.Carousel.prototype.changeClass = function (idx, add, className) {
  if (add) {
    $("div.items img:nth-child(" + idx + ")").addClass(className);
  } else {
    $("div.items img:nth-child(" + idx + ")").removeClass(className);
  }
}

$.Carousel.prototype.slide = function (dir) {
  if (this.transitioning) {
    return;
  }
  this.transitioning = true
  this.changeClass(this.activeIdx, false, "active");
  this.changeClass(this.activeIdx, true, (dir === 1 ? "prev" : "next"));
  
  var prevIdx = getIdx.call(this, this.activeIdx, -dir);
  this.changeClass(prevIdx, false, (dir === 1 ? "prev" : "next"));
  
  this.activeIdx = getIdx.call(this, this.activeIdx, dir);
  this.changeClass(this.activeIdx, false, (dir === -1 ? "prev" : "next"));
  this.changeClass(this.activeIdx, true, "active");
  var $Img = $("div.items img:nth-child(" + this.activeIdx + ")");
  $Img.one("transitionend", this.completeFade.bind(this, dir)); 
}
  
$.Carousel.prototype.completeFade = function (dir) {
  var nextIdx = getIdx.call(this, this.activeIdx, dir);
  this.changeClass(nextIdx, true, (dir === -1 ? "prev" : "next"));
  this.transitioning = false;
}