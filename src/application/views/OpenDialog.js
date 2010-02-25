View.OpenDialog = new JS.Class(Application_Object, {
	initialize: function() {

		this.init();

		var self = this;
	
		var map;
		
		


		$("#editor-openMap-dialog").dialog({
			bgiframe: true,
			resizable: false,
			autoOpen: false,
			modal: true,
			width: 550,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.5
			},
			buttons: {
				'Load Map': function() {
					
					self.notify('mapDidLoad', map);

				  	$(this).dialog('close');
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});	
	},
	open: function() {
		$("#editor-openMap-dialog").dialog('open');
	}
});