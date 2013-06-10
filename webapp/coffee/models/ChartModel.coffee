define ['models/BaseModel', 'models/namespace', 'views/charts'], (BaseModel, namespace, Charts)->
  class ChartModel extends BaseModel
    easyRoute:(id, url, title) ->
      charts = new Charts(id, title)
      $.getJSON url, (dat) ->
        charts.populate(dat)

