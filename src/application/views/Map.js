View.Map = new JS.Class(Application_Object, {

	initialize: function(map) {

		this.init();
		
		this.map = map;
		this._map = '';
	},
	draw: function() {
		var canvasTag,
			width,
			height,
			canvas,
			image, position,
			self = this;

		width = this.map.width * this.map.tilewidth;
		height =  this.map.height * this.map.tileheight;

		if(!this._map) {
			var map = $('<div class="map">'),
				container = $('<div class="map-container">'),
				overlay = $('<div class="overlay">');
				
			container
				.width(width)
				.height(height)
				.append(overlay);
				
			map.append(container);
			this._map = map;
		}
		
		container = this._map.find('.map-container');
		container.empty();
		this.map.layers.forEach(function(layer, i) {
			canvasTag = $('<canvas>')
							.attr('id','layer-'+ i)
							.attr('height',height)
							.attr('width',width)
							.addClass('canvas');

			canvas = canvasTag.get(0).getContext("2d");
			console.log(layer);
			layer.tiles.forEach(function(tile, j) {
				position = self.map.getPositionForGID(tile.gid);
				
				image	 = self.map.getTilesetImageForGID(tile.gid);
			});

			container.append(canvasTag);
		});


		return this._map;
	},
	redraw: function() {
		this.draw();
	},
	setCursor : function(cursor) {
		
		cursor.setEvents($(this._map).find('div.map-container'));
		$(this._map).find('div.map-container').append(
			cursor.draw()
		)

	}

});