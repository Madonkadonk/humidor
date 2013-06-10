define ['models/namespace'], (namespace) ->
	class Display
		constructor: (id, title) ->
			@id = id
			$('#' + id + ' .title').text(title)
			setInterval( () ->
				$('#' + id + ' .temp').text(namespace.disp.temp)
				$('#' + id + ' .humid').text(namespace.disp.humid)
				$('#' + id + ' .level').text(namespace.disp.level)
			, 2000)

