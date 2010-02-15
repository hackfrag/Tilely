/**
 * Models
 */
jQuery.require('application/models/Tile.js');
jQuery.require('application/models/Layer.js');
jQuery.require('application/models/Map.js');

/**
 * Views
 */
jQuery.require('application/views/Cursor.js');
jQuery.require('application/views/Map.js');
jQuery.require('application/views/TilesetList.js');
jQuery.require('application/views/LayerList.js');
jQuery.require('application/views/TilesetDialog.js');
jQuery.require('application/views/Tileset.js');

var EditorController = new JS.Class(Application_Controller,{

	map : {},
	
	init: function() {
	

	},
	indexAction: function() {
		var mapData = localStorage.getObject('map');

		if(mapData) {
			var map = Map.load(mapData);
			this.post('editor/load', {'map' : map});
		}
	},
	loadAction: function(){
		this.map  = this.request.map;

		$('#sidebar-disabled').hide();



		var mapView,
			cursorView,
			layerListView,
			tilesetListView,
			tilesetView,
			self = this;

	
		cursorView		= new View.Cursor(1, 1, this.map.tilewidth, this.map.tileheight);
		mapView			= new View.Map(this.map);
		layerListView	= new View.LayerList(this.map.layers);
		tilesetListView	= new View.TilesetList(this.map.tilesets, UIListViewStyleSelect);
		tilesetView		= new View.Tileset(this.map.tilesets[0]);

		this.map.subscribe('didAddTileset', function(tileset, index) {
			tilesetListView.setActiveIndex(index);
			tilesetView.setTileset(tileset);
			$('#tileset').view().reload();
			$('#tilesets').view().reload();
		});
		
		tilesetListView.subscribe('selectionDidChange', function(index) {
			tilesetView.setTileset(self.map.tilesets[index]);
			$('#tileset').view().reload();
		})

		tilesetView.subscribe('afterTilesSelected', function(selected, size) {
			cursorView.setSize(size.width, size.height);
		})

		$('#layers').addView(layerListView);
		$('#tilesets').addView(tilesetListView);
		$('#tileset').addView(tilesetView);
		
		$('#main').addView(mapView);

		mapView.setCursor(cursorView);

		
		localStorage.setObject('map', this.map.encode());

	},
	addLayerAction : function() {

		var layer = new Layer('Ground', this.map.width, this.map.width);

		this.map.addLayer(layer);

		$('#layers').view().reload();

		localStorage.setObject('map', this.map.encode());
	},
	addTilesetAction: function() {
		var self = this;

		var dialog = new View.TilesetDialog ();

		dialog.subscribe('tilesetDidAdd', function(name, image, width, height) {
			
			var tileset = new Tileset(name, image, width, height, 32, 32);
			
		
			self.map.addTileset(tileset);
			$('#tilesets').view().reload();
			localStorage.setObject('map', self.map.encode());
		});

	}
	
})