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
			self = this,
			cords;

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
			
			layer.tiles.forEach(function(tile, i) {
				if(tile.gid !== 0) {
					
					position = self.map.getPositionForGID(tile.gid);
					image	 = self.map.getTilesetImageForGID(tile.gid);
					cords	 = self.map.indexToCords(i);
					
					canvas.drawImage(image,
							Math.abs(position.left),
							Math.abs(position.top),
							32,
							32,
							cords.x * 32,
							cords.y * 32,
							32,
							32
						)

				}



				
			});

			container.append(canvasTag);
		});


		return this._map;
	},
	redraw: function() {
		this.draw();
	},
	setCursor : function(cursor) {
		
		cursor.setEvents($(this._map));
		$(this._map).append(
			cursor.draw()
		)

	}

});