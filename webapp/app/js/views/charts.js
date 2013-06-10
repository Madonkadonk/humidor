define(['models/namespace', 'highcharts'], function(namespace, Highcharts) {
  var Charts;
  return Charts = (function() {
    function Charts(id, title) {
      this.id = id;
      $('#' + id + ' .title').text(title);
    }

    Charts.prototype.populate = function(dat) {
      var humidJson, levelJson, tempJson;
      levelJson = [];
      humidJson = [];
      tempJson = [];
      $.each(dat, function(index, val) {
        var dt;
        dt = new Date(val.created_at);
        tempJson.push([Date.parse(dt.toUTCString()), val.temp]);
        humidJson.push([Date.parse(dt.toUTCString()), val.humid]);
        return levelJson.push([Date.parse(dt.toUTCString()), val.level]);
      });
      console.log(tempJson);
      $('#' + this.id + ' .temp').highcharts({
        chart: {
          type: 'line',
          zoomType: 'x',
          events: {
            load: function() {
              var series;
              series = this.series[0];
              setInterval(function() {
                var dt;
                console.log(namespace.disp);
                dt = new Date(namespace.disp.created_at);
                console.log(Date.parse(dt.toUTCString()));
                series.addPoint([Date.parse(dt.toUTCString()), namespace.disp.temp], true, true);
                return true;
              }, 2000);
              return true;
            }
          }
        },
        title: 'Temprature',
        xAxis: {
          type: 'datetime',
          title: 'Date',
          maxZoom: 10000
        },
        yAxis: {
          title: 'Temprature (*C)'
        },
        tooltip: {
          valueSuffix: '*C'
        },
        series: [
          {
            name: 'Temp',
            data: tempJson
          }
        ]
      });
      $('#' + this.id + ' .humid').highcharts({
        chart: {
          type: 'line',
          zoomType: 'x',
          events: {
            load: function() {
              var series;
              series = this.series[0];
              setInterval(function() {
                var dt;
                dt = new Date(namespace.disp.created_at);
                series.addPoint([Date.parse(dt.toUTCString()), namespace.disp.humid], true, true);
                return true;
              }, 2000);
              return true;
            }
          }
        },
        title: 'Humidity',
        xAxis: {
          type: 'datetime',
          title: 'Date',
          maxZoom: 10000
        },
        yAxis: {
          title: 'Humidity (%)'
        },
        tooltip: {
          valueSuffix: '%'
        },
        series: [
          {
            name: 'Humid',
            data: tempJson
          }
        ]
      });
      return $('#' + this.id + ' .level').highcharts({
        chart: {
          type: 'line',
          zoomType: 'x',
          events: {
            load: function() {
              var series;
              series = this.series[0];
              setInterval(function() {
                var dt;
                dt = new Date(namespace.disp.created_at);
                series.addPoint([Date.parse(dt.toUTCString()), namespace.disp.level], true, true);
                return true;
              }, 2000);
              return true;
            }
          }
        },
        title: 'Distance',
        xAxis: {
          type: 'datetime',
          title: 'Date',
          maxZoom: 10000
        },
        yAxis: {
          title: 'Distance (cm (ish))'
        },
        tooltip: {
          valueSuffix: 'cm (ish)'
        },
        series: [
          {
            name: 'Distance',
            data: levelJson
          }
        ]
      });
    };

    return Charts;

  })();
});
