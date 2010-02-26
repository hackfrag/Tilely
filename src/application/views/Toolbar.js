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
				primary: 'ui-icon-disk'
			}
		})
		.click(function() {
			fc.route('editor/save')
		})

		$('#toolbar-action-undo').button({
			icons: {
				primary: 'ui-icon-undo'
			}
		})
		.click(function() {
			fc.route('editor/undo')
		})

		$('#toolbar-action-redo').button({
			icons: {
				primary: 'ui-icon-redo'
			}
		})
		.click(function() {
			fc.route('editor/redo')
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

		$('#toolbar-tools-collision').button({
			 text: false,

			icons: {
				primary: 'ui-icon-collision'
			}
		})
		.click(function() {
			fc.post('editor/changeCursorRole',{role: 'collision'})
		})

		$('#toolbar-layer').buttonset()

		$('#toolbar-layer-grid').button({
			 text: true,

			icons: {
				primary: 'ui-icon-grid'
			}
		})
		.click(function() {
			fc.post('editor/showGrid',{showGrid: $('#toolbar-layer-grid').is(':checked')})
		})

		$('#toolbar-layer-collision').button({
			 text: true,

			icons: {
				primary: 'ui-icon-collision-layer'
			}
		})
		.click(function() {

			fc.post('editor/showCollisionLayer',{showCollisionLayer: $('#toolbar-layer-collision').is(':checked')})
		})


		$('#toolbar-action-settings').button({
			icons: {
				primary: 'ui-icon-gear'
			}
		})

		$('#toolbar-action-navigator').button({
			icons: {
				primary: 'ui-icon-image'
			}
		})

		new UIUpload ({
			type: /.*/,
			selector: '#map-filedropzone',
			returnType: 'text',
			success: function(file) {

				if(file.type  == "text/xml") {
					map = Map.create(file.src);

					var fc = Application_Controller_Front.getInstance();
					fc.post('editor/load', {'map' : map});
					$('#map-filedropzone').val('');
				}

			}
		});

	}
};