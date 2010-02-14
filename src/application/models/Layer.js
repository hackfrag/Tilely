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

		for(var i = 0; i < (height * width); i++) {
			this.tiles.push(new Tile());
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