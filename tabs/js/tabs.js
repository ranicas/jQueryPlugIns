$.Tabs = function (el) { 
  this.$el = $(el);
  this.$activeTab = $(".tabs a.active");
  var idContent = this.$activeTab.attr("href");
  this.$contentTab = $(idContent); 
  this.$el.on("click", "a", this.clickTab.bind(this));
};

$.Tabs.prototype.fadeComplete = function () {
  this.$contentTab.removeClass("transitioning");
  this.$contentTab = $(this.$activeTab.attr("href"));
  this.$contentTab.addClass("active transitioning");
  setTimeout(function () {
    this.$contentTab.removeClass("transitioning");
  }.bind(this), 0);
}

$.Tabs.prototype.clickTab = function (event) {
  this.$activeTab.removeClass("active");
  this.$activeTab = $(event.currentTarget);
  this.$activeTab.addClass("active");
  
  this.$contentTab.removeClass("active");
  this.$contentTab.addClass("transitioning");
  this.$contentTab.one("transitionend", this.fadeComplete.bind(this));
}


$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

