View.TilesetList = new JS.Class(UIListView, {
	rowAtIndex: function(index) {
		var tileset = this.datasource[index];
		return tileset.name;
	},
	selectionDidChange: function(index) {
		this.notify('selectionDidChange', index);
	}
})