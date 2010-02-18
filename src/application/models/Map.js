

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

		var index = this.layers.length -1;
		this.notify('didAddLayer', layer, index);
		
	},
	addTileset :function(tileset, firstgid) {
		
		if(firstgid) {
			tileset.setFirstGID(firstgid);
		} else {
			var lastGID = this.getLastTilesetGID();
			tileset.setFirstGID(lastGID+1);
		}
		
		this.tilesets.push(tileset);
		var index = this.tilesets.length -1;
		
		this.notify('didAddTileset', tileset, index);
	},
	getLastTilesetGID: function() {
		if(this.tilesets.length) {
			var last = this.tilesets[this.tilesets.length-1];
		
			return last.getLastGID();
		} else {
			return 0;
		}
	},
	getTilesetImageForGID: function(gid) {
		var image	= $('<img>'),
			tileset = this.getTilesetForGID(gid);

		return image
					.attr('src', tileset.image);
	},
	getTilesetForGID: function(gid) {
		var result;
		var found = false;
		this.tilesets.forEach(function(tileset) {
	
			if(gid <= tileset.getLastGID() && !found) {
				result = tileset;
				found = true;
			}
		});
		return result;
	},
	getPositionForGID: function(gid) {
		var tileset = this.getTilesetForGID(gid),
			localid = 0,
			width	= 0,
			height	= 0,
			x		= 0,
			y		= 0;

		localid = (gid - tileset.firstgid) + 1;

		

		width	= tileset.width / tileset.tilewidth;
		height	= tileset.height / tileset.tileheight;

		
		y = Math.ceil(localid / width) - 1;
		x = localid - ((y ) * width) - 1;
	
		return {
			'top' : y * this.tileheight,
			'left': x * this.tilewidth
		};
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
			tileset.setFirstGID(item.firstgid);
			
			map.addTileset(tileset);
		});
		return map;
	},
	create: function(xml) {
		
		var map,
			layer,
			tileset,
			tile,
			xml = $(xml),
			xml = $(xml[1]);

		
		var map = new Map(xml.attr('width'), xml.attr('height'), xml.attr('tilewidth'), xml.attr('tileheight'));
		
		xml.find('layer').each(function(i, item) {
			item = $(item);
			layer = new Layer(item.attr('name'), item.attr('width'), item.attr('height'));
			
			item.find('tile').each(function(j, data){
				data = $(data);
				
				tile = new Tile(data.attr('gid'));
				
				layer.addTile(tile);
			});
			
			map.addLayer(layer);
		});
		
		xml.find('tileset').each(function(i, item) {
			item = $(item);
			tileset = new Tileset(item.attr('name'),  item.attr('image'), 0, 0, item.attr('tilewidth'), item.attr('tileheight'));

			map.addTileset(tileset, item.attr('firstgid'));
		});
		return map;
		
	}
})