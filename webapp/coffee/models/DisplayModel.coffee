define ['models/BaseModel', 'models/namespace', 'views/display'], (BaseModel, namespace, Display)->
  class DisplayModel extends BaseModel
    easyRoute:(id, url, title) ->
        namespace.disp = {}
        setInterval(() ->
          $.getJSON url, (dat) ->
            namespace.disp.temp = dat.temp
            namespace.disp.level = dat.level
            namespace.disp.humid = dat.humid
            console.log 'call'
        , 2000)
        display = new Display(id, title)
