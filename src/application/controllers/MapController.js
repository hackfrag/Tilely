var MapController = new JS.Class(Application_Controller,{
	
	init: function() {
	
		
	},
	createAction: function(){
		
		
		
		$("#newMap-dialog").dialog({
			bgiframe: true,
			resizable: false,
			autoOpen: false,
			modal: true,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.5
			},
			buttons: {
				'Create map': function() {
					var width	= $('#newMap-width').val(),
						height	= $('#newMap-height').val();
						
					var map = new Map(width, height ,32,32);
					var layer = new Layer('Ground', width, height);
					layer.createEmptyTiles();
					map.addLayer(layer);

					sessionStorage.setObject('map', null);

					var fc = Application_Controller_Front.getInstance();
			
					fc.post('editor/load', {'map' : map});

				  	$(this).dialog('close');
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});
		$("#newMap-dialog").dialog('open');

	}
});