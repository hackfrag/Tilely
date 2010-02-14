var UIUpload = new JS.Class({
	
	options:  '',

	initialize: function(options) {
		this.options = options;

		var self = this,
			dropzone = $('<div>'),
			item;

		dropzone
			.addClass('dropzone')
			.html('Drop a File here');
		
		dropzone.get(0).addEventListener("dragover", function(event) {
			event.preventDefault();
		}, true);
		dropzone.get(0).addEventListener("drop", function(e) {

			e.preventDefault();

			var dt = e.dataTransfer;
			var files = dt.files;

			e.preventDefault();
		
			if (files.length == 1) {
				var file = files[0];
				var imageMatch = self.options.type;

				if(file.type.match(imageMatch)) {
						
					var reader = new FileReader();
					
					reader.onloadend = function() {

						item = {
							src : reader.result,
							file: file.fileName,
							type: file.type
						};
	
						self.options['success'](item);
					}
					reader.readAsDataURL(file);


				}
			}

		}, true);
		return dropzone;
		
	}
})