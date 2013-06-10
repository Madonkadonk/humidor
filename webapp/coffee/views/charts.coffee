define ['models/namespace', 'highcharts'], (namespace, Highcharts) ->
	class Charts
		constructor: (id, title) ->
			@id = id
			$('#' + id + ' .title').text(title)
		populate: (dat) ->
			levelJson = []
			humidJson = []
			tempJson = []
			$.each dat, (index, val)->
				dt = new Date(val.created_at)
				tempJson.push([
					Date.parse(dt.toUTCString()),
					val.temp
				])
				humidJson.push([
					Date.parse(dt.toUTCString()),
					val.humid
				])
				levelJson.push([
					Date.parse(dt.toUTCString()),
					val.level
				])
			console.log tempJson
			$('#' + @id + ' .temp').highcharts
				chart:
					type: 'line'
					zoomType: 'x'
					events:
						load: ()->
							seriesTemp = this.series[0]
							seriesHumid = this.series[1]
							seriesLevel = this.series[2]
							setInterval( ()->
								console.log namespace.disp
								dt = new Date(namespace.disp.created_at)
								console.log Date.parse(dt.toUTCString())
								seriesTemp.addPoint([Date.parse(dt.toUTCString()), namespace.disp.temp], true, true)
								seriesHumid.addPoint([Date.parse(dt.toUTCString()), namespace.disp.humid], true, true)
								seriesLevel.addPoint([Date.parse(dt.toUTCString()), namespace.disp.level], true, true)
								return true
							, 2000)
							return true
				title:
					'Temprature'
				xAxis:
					type: 'datetime'
					title: 'Date'
					maxZoom: 10000
				tooltip:
					shared: true
					crosshairs: true
					formatter: () ->
						s = new Date(this.x).toLocaleString()
						$.each this.points, (i, point) ->
							s += '<br/>' + point.series.name + ': ' + point.y + ' ' + point.series.tooltipOptions.label
						s
				series: [{
						name: 'Temp',
						data: tempJson
						tooltip:
							label: '*C'
				},
				{
						name: 'Humid',
						data: humidJson
						tooltip:
							label: '%'
				},
				{
						name: 'Distance',
						data: levelJson
						tooltip:
							label: 'cm (ish)'
				}]
