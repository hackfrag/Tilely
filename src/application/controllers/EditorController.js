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
jQuery.require('application/views/Toolbar.js');
jQuery.require('application/views/Navigator.js');


var EditorController = new JS.Class(Application_Controller,{

	init: function() {
		
		this.map	= {};
		this.layer	= 0;
		this.tileset= 0;
		this.cursor = '';
		
		
	},
	
	indexAction: function() {

		this.undoManager = new UndoManager();
		
		View.Toolbar.init();
		
		var mapData = localStorage.getObject('map');
		if(mapData) {
			var map = Map.load(mapData);
			this.post('editor/load', {'map' : map});
		}

		/*
		 *
		 var worker	= new  Worker("application/workers/json.js"),
			$this	= this;

		worker.onmessage = function(e){

			if(e.data) {
				var map = Map.load(e.data);
				$this.post('editor/load', {'map' : map});
			}

		};

		worker.postMessage({
			action	: 'load',
			param	: localStorage.map
		});
		 */
	},
	loadAction: function(){
		this.map  = this.request.map;
		
		$('#sidebar-disabled').hide();


		
		var mapView,
			layerListView,
			tilesetListView,
			tilesetView,
			$this = this;


		/**
		 * Flash check & save init
		 */
		if(jQuery.playerVersion() == "0,0,0") {
			$("#toolbar-action-save-fake").hide();
		} else {
			$("#toolbar-action-save-fake").downloadify({
				filename: function(){
					return "map.xml";
				},
				data: function(){
					return $this.map.asXML();
				},
				swf: 'assets/media/downloadify.swf',
				downloadImage: 'assets/images/clear.png',
				width: 60,
				height: 28,
				transparent: true,
				append: false

			});	
		}

		/**
		 * Autosaver
		 */
		setTimeout(function() {
			$this.route('editor/autosave');
		}, 5000)
		
		
		
	
		this.cursor		= new View.Cursor(1, 1, this.map.tilewidth, this.map.tileheight);
		mapView			= new View.Map(this.map);
		layerListView	= new View.LayerList(this.map.layers);
		tilesetListView	= new View.TilesetList(this.map.tilesets, UIListViewStyleSelect);
		tilesetView		= new View.Tileset(this.map.tilesets[0]);
	
		
		this.layer = 0;
		layerListView
			.setActiveIndex(0)
			.setDelegate(this);

		tilesetListView.setDelegate(this);

		this.map.setDelegate(this);

		this.cursor.setRole('stamp');
		this.cursor.setDelegate(this);

		tilesetView.setDelegate(this);

		$('#layers')	.addView(layerListView);
		$('#tilesets')	.addView(tilesetListView);
		$('#tileset')	.addView(tilesetView);
		$('#main')		.addView(mapView);

		mapView.setCursor(this.cursor);

		/*
		var navigator = new View.Navigator();
		navigator.open();
		*/
		localStorage.setObject('map', this.map.encode());

	},
	addLayerAction : function() {
		
		var layer = new Layer('Layer', this.map.width, this.map.width);
		layer.createEmptyTiles();
		
		this.map.addLayer(layer);



		$('#layers').view().reload();
	
		localStorage.setObject('map', this.map.encode());
	
	},
	saveAction: function() {
		
	},
	addTilesetAction: function() {
	
		var $this	= this,
			dialog	= new View.TilesetDialog ();
	
		dialog.subscribe('tilesetDidAdd', function(name, image, width, height) {
			
			var tileset = new Tileset(name, image, width, height, 32, 32);
			
		
			$this.map.addTileset(tileset);
			
			
			localStorage.setObject('map', $this.map.encode());
		});

	},
	changeCursorRoleAction: function() {
		this.cursor.setRole(this.request.role);
		if(this.request.role == "collision") {
			this.showCollisionLayerAction();
		}
	},
	showCollisionLayerAction: function() {
	
		$('#main')
			.view()
			.showCollisionLayer(this.request.showCollision)
			.redraw();
	},
	showGridAction: function() {
		
		$('#main')
			.view()
			.showGrid(this.request.showGrid)
			.redraw();
	},
	autosaveAction: function() {
		var $this = this;
		
		localStorage.setObject('map', this.map.encode());
	
		setTimeout(function() {
			$this.route('editor/autosave');
		}, 5000);
		
		
	},
	undoAction: function() {
		this.undoManager.undo();
	},
	redoAction: function() {
		this.undoManager.redo();
	},
	///////////////////////////////////////////////////////////////////////////
	/**
	 * Delegates
	 */
	didSelectLayerAtIndex: function(layer, index) {
		this.layer = index;
	},
	
	didAddLayer: function(layer, index) {

		$('#main')
			.view()
			.redraw();

		$('#layers')
			.view()
			.setActiveIndex(index);
		this.layer = index;

	},
	didAddTileset : function(tileset, index) {

		$('#tileset')
			.view()
			.setTileset(tileset)
			.reload();
			
		$('#tilesets')
			.view()
			.setActiveIndex(index)
			.reload();
	},
	cursorClicked: function(size, position, pattern) {

	
		
		var tiles	= [],
			$this	= this;
		
		switch(this.cursor.role) {
			case 'stamp':
			

				var widthCount = 0,
					heightCount = 0;


				if(pattern.length == 1) {
					tiles.push({
						layer	: $this.layer,
						x		: position.x,
						y		: position.y,
						gid		: pattern[0].gid
					});
				} else {
					pattern.forEach(function(item, i) {
						if(size.height > heightCount) {
							tiles.push({
								layer	: $this.layer,
								x		: (position.x + widthCount),
								y		: (position.y + heightCount),
								gid		: item.gid
							});

							heightCount+=1;

						} else {
							heightCount=0;
							widthCount+=1;
							
							tiles.push({
								layer	: $this.layer,
								x		: (position.x + widthCount),
								y		: (position.y + heightCount),
								gid		: item.gid
							});

							heightCount+=1;
						}

					})

				}

				break;
			case 'bucket':
				
				for(var i = 0; i < $this.map.width; i++) {
					for(var j = 0; j < $this.map.height; j++) {
					
						tiles.push({
							layer	: $this.layer,
							x		: i,
							y		: j,
							gid		: pattern[0].gid
						});

					}
				}

				break;
			case 'eraser':
				if(pattern.length == 1) {
					tiles.push({
						layer	: $this.layer,
						x		: position.x,
						y		: position.y,
						gid		: 0
					});
				}
				break;
		}
		
		var action = {
			undo: function() {
			
				var old;
				tiles.forEach(function(tile, i) {
					
			
				
					$this.map.setTileAtCords(tile.layer, tile.x, tile.y, tile.old.gid);
				});
				$('#main').view().redraw();
			},
			redo: function() {
			
				tiles.forEach(function(tile, i) {
					tile.old = jQuery.extend({}, $this.map.getTileAtCords(tile.layer, tile.x, tile.y))
					$this.map.setTileAtCords(tile.layer, tile.x, tile.y, tile.gid);
				});
				$('#main').view().redraw();
			}

		}
		
		this.undoManager.add(action);
		action.redo();
	},
	tilesetSelectionDidChange: function(index) {

		$('#tileset')
			.view()
			.setTileset(this.map.tilesets[index])
			.reload();
	},
	afterTilesSelected: function(pattern, size) {
		this.cursor.setPattern(pattern);
		this.cursor.setSize(size.width, size.height);
	},
	afterTileSelected: function(pattern, size) {
		this.cursor.setPattern(pattern);
		this.cursor.setSize(size.width, size.height);
	},
	layerStatusDidChanged: function(index, status) {

		this.map.layers[index].visible = status;
		
		$('#main')
			.view()
			.redraw();
	},
	layerNameDidChanged: function(name, index) {
		this.map.layers[index].name = name;
		$('#layers').view().reload();
	},
	layerOrderDidChanged: function () {
		var array = [],
			index = 0,
			$this = this;

		$('#layers').find('li').each(function(i, item){
			index = $(this).attr('value');
			array.push($this.map.layers[index]);
		});
		$this.map.layers = array;
		$('#layers').view().datasource = $this.map.layers;
		$('#layers').view().reload();
		$('#main')
			.view()
			.redraw();
		
	}
});