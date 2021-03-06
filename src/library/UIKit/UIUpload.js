var UIUpload = new JS.Class({
	
	options:  '',

	initialize: function(options) {
		this.options = options;

		var self = this,
			dropzone = $(options.selector),
			item;
			

		dropzone.get(0).addEventListener("change", function(e) {

			var files = this.files;
		
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
					switch(self.options['returnType']) {
						case 'dataURL':
							reader.readAsDataURL(file);
							break;
						case 'text':
							reader.readAsText(file);
							break;
						case 'binary':
							reader.readAsBinaryString(file);
							break;
						default:
							reader.readAsText(file);
					}
					


				}
			}

		}, true);
		return dropzone;
		
	}
});