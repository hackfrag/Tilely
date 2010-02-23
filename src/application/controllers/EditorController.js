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
jQuery.require('application/views/OpenDialog.js');

var EditorController = new JS.Class(Application_Controller,{

	map : {},
	
	init: function() {
	

	},
	indexAction: function() {
		var mapData = sessionStorage.getObject('map');
		if(mapData) {
			var map = Map.load(mapData);
			this.post('editor/load', {'map' : map});
		}
		/*
		 *
		 var worker	= new  Worker("application/workers/json.js"),
			self	= this;

		worker.onmessage = function(e){

			if(e.data) {
				var map = Map.load(e.data);
				self.post('editor/load', {'map' : map});
			}

		};

		worker.postMessage({
			action	: 'load',
			param	: sessionStorage.map
		});
		 */
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

		this.map.subscribe('didAddLayer', function(tileset, index) {
			$('#main').view().redraw();
		});

		this.map.subscribe('didAddTileset', function(tileset, index) {
			tilesetListView.setActiveIndex(index);
			tilesetView.setTileset(tileset);
			$('#tileset').view().reload();
			$('#tilesets').view().reload();
		});

		cursorView.subscribe('click', function(position) {
			var index = self.map.cordsToIndex(position.x, position.y);
		
			self.map.setTile(0, index, 1);
			$('#main').view().redraw();
			sessionStorage.setObject('map', self.map.encode());
		});

		tilesetListView.subscribe('selectionDidChange', function(index) {
			tilesetView.setTileset(self.map.tilesets[index]);
			$('#tileset').view().reload();
		})

		tilesetView.subscribe('afterTilesSelected', function(selected, size) {

			cursorView.setSize(size.width, size.height);
		})
		tilesetView.subscribe('afterTileSelected', function(selected, size) {

			cursorView.setSize(size.width, size.height);
		})

		$('#layers').addView(layerListView);
		$('#tilesets').addView(tilesetListView);
		$('#tileset').addView(tilesetView);
		
		$('#main').addView(mapView);

		mapView.setCursor(cursorView);

		
		sessionStorage.setObject('map', this.map.encode());

	},
	addLayerAction : function() {

		var layer = new Layer('Ground', this.map.width, this.map.width);
		layer.createEmptyTiles();
		
		this.map.addLayer(layer);

		$('#layers').view().reload();

		sessionStorage.setObject('map', this.map.encode());
	},
	openAction: function() {
		var dialog = new View.OpenDialog();
		
		dialog.subscribe('mapDidLoad', function(map) {
			var fc = Application_Controller_Front.getInstance();
			fc.post('editor/load', {'map' : map});
		});
		
		dialog.open();
	},
	addTilesetAction: function() {
		var self = this;

		var dialog = new View.TilesetDialog ();

		dialog.subscribe('tilesetDidAdd', function(name, image, width, height) {
			
			var tileset = new Tileset(name, image, width, height, 32, 32);
			
		
			self.map.addTileset(tileset);
			$('#tilesets').view().reload();
			sessionStorage.setObject('map', self.map.encode());
		});

	}
	
})