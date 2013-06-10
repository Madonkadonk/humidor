var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/BaseModel', 'models/namespace', 'views/display'], function(BaseModel, namespace, Display) {
  var DisplayModel, _ref;
  return DisplayModel = (function(_super) {
    __extends(DisplayModel, _super);

    function DisplayModel() {
      _ref = DisplayModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DisplayModel.prototype.easyRoute = function(id, url, title) {
      var display;
      namespace.disp = {};
      setInterval(function() {
        return $.getJSON(url, function(dat) {
          namespace.disp.created_at = dat.created_at;
          namespace.disp.temp = dat.temp;
          namespace.disp.level = dat.level;
          return namespace.disp.humid = dat.humid;
        });
      }, 2000);
      return display = new Display(id, title);
    };

    return DisplayModel;

  })(BaseModel);
});
