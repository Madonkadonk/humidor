define(['models/namespace', 'highcharts'], function(namespace, Highcharts) {
  var Charts;
  return Charts = (function() {
    function Charts(id, title) {
      this.id = id;
      $('#' + id + ' .title').text(title);
    }

    Charts.prototype.populate = function(dat) {
      var tempJson;
      tempJson = [];
      $.each(dat, function(index, val) {
        return tempJson.push([new Date(val.created_at), val.temp]);
      });
      return $('#' + this.id + ' .temp').highcharts({
        chart: {
          type: 'line',
          events: {
            load: function() {
              setInterval(function() {
                $.getJSON('http://192.168.1.113:3000/humid/getCurrent?callback=?', function(dat) {
                  this.series[0].addPoint([new Date(dat.created_at), dat.temp], true, true);
                  return true;
                });
                return true;
              }, 2000);
              return true;
            }
          }
        },
        title: 'Temprature',
        xAxis: {
          title: 'Date'
        },
        yAxis: {
          title: 'Temprature (&deg;C)'
        },
        tooltip: {
          valueSuffix: '&deg;C'
        },
        series: [
          {
            name: 'Temp',
            data: tempJson
          }
        ]
      });
    };

    return Charts;

  })();
});
