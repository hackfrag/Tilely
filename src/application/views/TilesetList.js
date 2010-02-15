View.TilesetList = new JS.Class(UIListView, {

	setActiveIndex: function(index) {
		this.active = index;
	},
	rowAtIndex: function(index) {
		var tileset = this.datasource[index];
		return tileset.name;
	},
	selectionDidChange: function(index) {
		this.notify('selectionDidChange', index);
	},
	isActive: function(index) {
		return (this.active == index);
	}
})