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



		$('#toolbar-tools-stamp').button({
			text: true,
			icons: {
				primary: 'ui-icon-save'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'stamp'})
		})

		$('#toolbar-tools-bucket').button({
			text: true,
			icons: {
				primary: 'ui-icon-save'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'bucket'})
		})

		$('#toolbar-tools-eraser').button({
			 text: true,

			icons: {
				primary: 'ui-icon-save'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'eraser'})
		})

	


	}
};