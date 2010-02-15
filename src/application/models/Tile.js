var Tile = new JS.Class({
	initialize: function(gid) {
		this.gid = gid;
	},
	encode: function() {
		var tile = {
			gid: this.gid
		};
		return tile;
	}
})