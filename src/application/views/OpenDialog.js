View.OpenDialog = new JS.Class(Application_Object, {
	initialize: function() {

		this.init();

		var self = this;
	
		var map;
		
		var fileupload = new UIUpload ({
			type: /.*/,
			label: 'Drop a map file here',
			returnType: 'text',
			success: function(file) {
				console.log(file);
				
				if(file.type  == "text/xml") {
					map = Map.create(file.src);
					
					map.tilesets.forEach(function(tileset) {
						
					});
				}
				
			}
		});



		$('#map-filedropzone')
			.empty()
			.append(fileupload);

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
})