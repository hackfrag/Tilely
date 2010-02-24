View.Toolbar = {

	init: function() {

		var fc = Application_Controller_Front.getInstance();

		$('#toolbar-action-new').button({
			icons: {
				primary: 'ui-icon-document'
			}
		})
		.click(function() {
			fc.route('map/create');
		})


		$('#toolbar-action-open').button({
			icons: {
				primary: 'ui-icon-folder-open'
			}
		})
		.click(function() {
			fc.route('editor/open')
		})

		$('#toolbar-action-save').button({
			icons: {
				primary: 'ui-icon-save'
			}
		})
		.click(function() {
			fc.route('editor/save')
		})


		$('#toolbar-tools').buttonset()
		$('#toolbar-tools-stamp').button({
			text: false,
			icons: {
				primary: 'ui-icon-stamp'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'stamp'})
		})

		$('#toolbar-tools-bucket').button({
			text: false,
			icons: {
				primary: 'ui-icon-bucket'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'bucket'})
		})

		$('#toolbar-tools-eraser').button({
			 text: false,

			icons: {
				primary: 'ui-icon-eraser'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'eraser'})
		})

	
		

	}
};