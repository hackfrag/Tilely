var Tile = new JS.Class({
	initialize: function() {
		this.gid = 0;
	},
	encode: function() {
		var tile = {
			gid: this.gid
		};
		return tile;
	}
})