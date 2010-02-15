var Layer = new JS.Class({

	name : '',
	properties: [],
	tiles: [],
	width: 5,
	height: 5,
	
	initialize: function(name, width, height) {

		this.name	= name;
		this.width	= width;
		this.height = height;

	},
	addTile: function(tile) {
		this.tiles.push(tile);
	},
	createEmptyTiles: function() {
		for(var i = 0; i < (this.height * this.width); i++) {
			this.addTile(new Tile(0));
		}
	},
	encode: function() {
		var layer = {
			name	: this.name,
			width	: this.width,
			height	: this.height,
			tiles	: []
		}

		this.tiles.forEach(function(tile) {
			layer.tiles.push(tile.encode());
		});
		return layer;
	}

})