View.TilesetDialog = new JS.Class(Application_Object, {
	initialize: function() {

		this.init();

		var self = this;

		new UIUpload ({
			type: /.*/,
			selector: '#tileset-filedropzone',
			returnType: 'dataURL',
			success: function(file) {
				var image = $('<img>')
								.attr('src',file.src);

					image.clone().appendTo($('#tmp').empty())
					image.appendTo($('#tileset-file').empty())
				
				$('#editor-addTileset-name').val(file.file);
			}
		});


		$('#tileset-file').empty();



		$("#editor-addTileset-dialog").dialog({
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
				'New Tileset': function() {

					var name	= $('#editor-addTileset-name').val();
					var image	= $('#tileset-file > img').attr('src');
					var width	= $('#tmp > img').width();
					var height	= $('#tmp > img').height();
					
					self.notify('tilesetDidAdd', name, image, width, height);

					$('#tilesets').view().reload();

				  	$(this).dialog('close');
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});
		$("#editor-addTileset-dialog").dialog('open');
	}
});