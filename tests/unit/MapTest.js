
$(document).ready(function() {


module("Map")

	test('create a new map', function() {
		var map = new Map(5,5,32,32);
		equals(map.width, 5, "map width is 5");
		equals(map.height, 5, "map height is 5");
		equals(map.tilewidth, 32, "tilewitdh is 32");
		equals(map.tileheight, 32, "tileheight is 32");
	});

	test('Layer', function() {
		var map = new Map(5,5,32,32);

		var layer = new Layer('Ground', 5, 5);

		map.addLayer(layer);

		equals(map.layers.length, 1);

		var event = false;

		map.subscribe('didAddLayer', function(layer, index) {
			event = true;
			equals(layer.width, 5);
			equals(index, 1);
		});
		map.addLayer(layer);
		
		ok(event, "didAddLayer as send");
	});

	test('Tilesets', function() {
		var map = new Map(5,5,32,32);

		var tileset = new Tileset('file', '', 64, 64, 32, 32);

		var event = false;

		
		map.addTileset(tileset);
		equals(map.tilesets.length, 1);
		
		

		equals(map.getLastTilesetGID(),4, "last tileset gid is 4")

		var tileset2 = new Tileset('file2', '', 64, 64, 32, 32);

		map.subscribe('didAddTileset', function(tileset, index) {
			event = true;
			equals(tileset.width, 64);
			equals(index, 1);
		});
		map.addTileset(tileset2);
		ok(event, "didAddTileset as send");
		equals(map.getLastTilesetGID(), 8, "last tileset gid is 8");

		equals(map.getTilesetForGID(1).name, "file");
		equals(map.getTilesetForGID(2).name, "file");
		equals(map.getTilesetForGID(3).name, "file");
		equals(map.getTilesetForGID(4).name, "file");

		equals(map.getTilesetForGID(5).name, "file2");
		equals(map.getTilesetForGID(6).name, "file2");
		equals(map.getTilesetForGID(7).name, "file2");
		equals(map.getTilesetForGID(8).name, "file2");

		var pos;
		
		pos = map.getPositionForGID(1);
		equals(pos.left, 0);
		equals(pos.top, 0);

		pos = map.getPositionForGID(2);
		equals(pos.left, 32);
		equals(pos.top, 0);

		pos = map.getPositionForGID(3);
		equals(pos.left, 0);
		equals(pos.top, 32);

		pos = map.getPositionForGID(4);
		equals(pos.left, 32);
		equals(pos.top, 32);
	});
	
});