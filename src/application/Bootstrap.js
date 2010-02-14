jQuery.require('external/core.js');
jQuery.require('external/stdlib.js');
jQuery.require('external/jquery.json2xml.js');
jQuery.require('external/jquery.ui.js');
jQuery.require('external/jquery.mousehold.js');

jQuery.require('Library/AppKit/AppKit.js');
jQuery.require('Library/UIKit/UIKit.js');


jQuery.require('application/models/Tile.js');
jQuery.require('application/models/Layer.js');
jQuery.require('application/models/Tileset.js');
jQuery.require('application/models/Map.js');



$(document).ready(function() {

	UIKit.parse();
	var frontController = new Application_Controller_Front('application/controllers/');
	frontController.run();

	frontController.route('editor/index');
});