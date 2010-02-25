var Layer = new JS.Class({


	initialize: function(name, width, height) {

		this.name		= name;
		this.width		= width;
		this.height		= height;
		this.properties = [];
		this.tiles		= [];
		this.visible	= true;
		this.alpha		= 1.0;

	},
	addTile: function(tile) {
		this.tiles.push(tile);
	},
	createEmptyTiles: function() {
		for(var i = -1; i < (this.height * this.width) ; i++) {
			this.addTile(new Tile(0));
		}
	},
	encode: function() {
		var layer = {
			name	: this.name,
			width	: this.width,
			height	: this.height,
			tiles	: [],
			visible	: this.visible,
			alpha	: this.alpha
		}

		this.tiles.forEach(function(tile) {
			layer.tiles.push(tile.encode());
		});
		return layer;
	},
	encodeXML: function() {
		var layer = {
			name	: this.name,
			width	: this.width,
			height	: this.height,
			data	: {
				tile: []
			}
		}

		this.tiles.forEach(function(tile) {
			layer.data.tile.push(tile.encode());
		});
		return layer;
	}
});