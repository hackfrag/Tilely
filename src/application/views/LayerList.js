
View.LayerList = new JS.Class(UIListView, {
	

	/**
	 * Datasource methodes
	 */
	rowAtIndex: function(index) {
		var cell	= $('<div>'),
			input	= $('<input>'),
			label	= $('<span>'),
			layer	= this.datasource[index],
			self	= this;

		input
			.attr('type','checkbox')
			.attr('checked','checked')
			.click(function() {
				var status = $(this).is(':checked');
				self.notify('layerStatusDidChanged', index, status);
			})

		label
			.html(layer.name)
		cell
			.append(input)
			.append(label)


		return cell;
	},
	
	/**
	 * Delegate methodes
	 */
	isSortable: function() {
		return true;
	},
	orderDidChange: function(event, ui) {
		this.notify('layerOrderDidChanged');
	},
	isSelectAbleAtIndex: function(index) {
		return true;
	},
	didSelectedAtIndex: function(index) {
		
	}
})