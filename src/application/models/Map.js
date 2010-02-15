

var Map = new JS.Class(Application_Object, {

	
	initialize: function(width, height, tilewidth, tileheight) {

	
		this.init();

		this.version		= '1.0';
		this.orientation	= 'orthogonal';
		this.width			= width;
		this.height			= height;
		this.tilewidth		= tilewidth;
		this.tileheight		= tileheight;
		this.layers			= [];
		this.tilesets		= [];

		
		
	},
	addLayer : function(layer) {
		this.layers.push(layer);
		this.notify('didAddLayer', layer);
		
	},
	addTileset :function(tileset) {
		this.tilesets.push(tileset);
		var index = this.tilesets.length -1;
		this.notify('didAddTileset', tileset, index);
	},
	
	asXML: function() {
	
		var xml = $.json2xml(this, {
			formatOutput: true,
			rootTagName: 'map',
			replace: [{'tiles' : 'data'}]

		});
		return	'<?xml version="1.0" encoding="UTF-8"?>\n' +
				'<!DOCTYPE map SYSTEM "http://mapeditor.org/dtd/1.0/map.dtd">\n' +
				xml;
	},
	encode: function() {
		var map = {
			version		: this.version,
			orientation	: this.orientation,
			width		: this.width,
			height		: this.height,
			tilewidth	: this.tilewidth,
			tileheight	: this.tileheight,
			layers		: [],
			tilesets	: []
		};

		this.layers.forEach(function(layer) {
			map.layers.push(layer.encode());
		});
		this.tilesets.forEach(function(tileset) {
	
			map.tilesets.push(tileset.encode());
		});

		return map;
	}
});

Map.extend({
	load: function(data) {
		var map = new Map(data.width, data.height,data.tilewidth, data.tileheight),
			layer,
			tileset

		data.layers.forEach(function(item) {
			layer = new Layer(item.name, item.width, item.height);

			map.addLayer(layer);
		});
		data.tilesets.forEach(function(item) {
			tileset = new Tileset(item.name,  item.image, item.width, item.height, item.tilewidth, item.tileheight);

			map.addTileset(tileset);
		});
		return map;
	}
})