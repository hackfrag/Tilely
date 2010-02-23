View.TilesetList = new JS.Class(UIListView, {

	setActiveIndex: function(index) {
		this.active = index;
		return this;
	},
	rowAtIndex: function(index) {
		var tileset = this.datasource[index];
		return tileset.name;
	},
	selectionDidChange: function(index) {
		this.notify('tilesetSelectionDidChange', index);
	},
	isActive: function(index) {
		return (this.active == index);
	}
});