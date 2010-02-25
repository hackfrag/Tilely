View.Navigator = new JS.Class(Application_Object, {
	initialize: function() {

		$("#editor-navigator").dialog({
			bgiframe: true,
			resizable: false,
			autoOpen: false,
			modal: false,
			width: 300,
			height:300,
			position: 'right',
			overlay: {
				backgroundColor: '#000',
				opacity: 0.5
			}			
		});
	},
	open: function() {
		this.reload();
		$("#editor-navigator").dialog('open');
	},
	reload: function() {
		var image = $('<img>');
		var src = $('#layer').get(0).toDataURL("image/png");

		image.attr('src', src);
		image.width('275')
		$('#navigator-map').empty();
		image.appendTo('#navigator-map')

	}
});