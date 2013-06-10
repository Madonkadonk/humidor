define ['models/BaseModel', 'models/namespace', 'views/display'], (BaseModel, namespace, Display)->
  class DisplayModel extends BaseModel
    easyRoute:(id, url, title) ->
        namespace.disp = {}
        setInterval(() ->
          $.getJSON url, (dat) ->
            namespace.disp.created_at = dat.created_at
            namespace.disp.temp = dat.temp
            namespace.disp.level = dat.level
            namespace.disp.humid = dat.humid
        , 2000)
        display = new Display(id, title)

