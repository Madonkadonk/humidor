define ['models/namespace', 'highcharts'], (namespace, Highcharts) ->
	class Charts
		constructor: (id, title) ->
			@id = id
			$('#' + id + ' .title').text(title)
		populate: (dat) ->
			tempJson = []
			$.each dat, (index, val)->
				tempJson.push([
					new Date(val.created_at),
					val.temp
				])
			$('#' + @id + ' .temp').highcharts
				chart:
					type: 'line'
					events:
						load: ()->
							setInterval( ()->
								$.getJSON 'http://192.168.1.113:3000/humid/getCurrent?callback=?', (dat)->
									console.log this
									this.series[0].addPoint([new Date(dat.created_at), dat.temp], true, true)
									return true
								return true
							, 2000)
							return true
				title:
					'Temprature'
				xAxis:
					title:
						'Date'
				yAxis:
					title:
						'Temprature (&deg;C)'
				tooltip:
					valueSuffix:
						'&deg;C'
				series: [{
						name: 'Temp',
						data: tempJson
				}]
