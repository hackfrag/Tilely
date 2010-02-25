View.Map = new JS.Class(Application_Object, {

	initialize: function(map) {

		this.init();
		
		this.map = map;
		this._map = '';
		this.grid		= false;
		this.collision	= false;
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
			var map = $('<div class="map">')
				

			map
				.width(width)
				.height(height)

			
			canvasTag = $('<canvas>')
							.attr('id','layer')
							.attr('height',height)
							.attr('width',width)
							.addClass('canvas');
			
			map.append(canvasTag);
			this._map = map;
		}
		
		canvasTag = this._map.find('canvas');
		canvas = canvasTag.get(0).getContext("2d");
		
		canvas.clearRect(0,0,width, height)

		this.map.layers.forEach(function(layer, i) {

			if(layer.visible) {
				canvas.globalAlpha = layer.alpha;
				layer.tiles.forEach(function(tile, i) {
					if(tile.gid != 0) {

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
			}

			
		});

		
		if(this.grid) {
			canvas.strokeStyle = "#ccc";

			for(var x = 0; x < this.map.width; x++) {
				canvas.beginPath();
				canvas.moveTo(x * this.map.tilewidth, 0);
				canvas.lineTo(x * this.map.tilewidth, height);
				canvas.stroke();
				for(var y = 0; y < this.map.height; y++) {
					canvas.beginPath();
					canvas.moveTo(0, y * this.map.tileheight);
					canvas.lineTo(width, y * this.map.tileheight);
					canvas.stroke();
				}
			}
			

		}

		return this._map;
	},
	showCollisionLayer: function(flag) {
		this.collision = flag;
		return this;
	},
	showGrid: function(flag) {
		this.grid = flag;
		return this;
	},
	redraw: function() {
		this.draw();
	},
	setCursor : function(cursor) {
		
		cursor.setEvents($(this._map));
		$(this._map).append(
			cursor.draw()
		)
		return this;

	}

});