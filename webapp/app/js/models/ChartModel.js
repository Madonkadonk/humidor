var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/BaseModel', 'models/namespace', 'views/charts'], function(BaseModel, namespace, Charts) {
  var ChartModel, _ref;
  return ChartModel = (function(_super) {
    __extends(ChartModel, _super);

    function ChartModel() {
      _ref = ChartModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ChartModel.prototype.easyRoute = function(id, url, title) {
      var charts;
      charts = new Charts(id, title);
      return $.getJSON(url, function(dat) {
        return charts.populate(dat);
      });
    };

    return ChartModel;

  })(BaseModel);
});
