

var Tileset = new JS.Class(Application_Object, {

	initialize: function(name, image, width, height, tilewidth, tileheight) {

		this.init();
	
		this.firstgid	= 0;
		this.image		= image;
		this.name		= name;
		this.tilewidth	= parseInt(tilewidth);
		this.tileheight	= parseInt(tileheight);
		this.width		= parseInt(width);
		this.height		= parseInt(height);
		this.firstgid	= 1;
		this.spacing	= 1;
		this.margin		= 0;
		
	},
	setFirstGID: function(gid) {
		this.firstgid = gid;
	},
	getFirstGID: function() {
		return this.firstgid;
	},
	getLastGID: function() {
		return (this.width / this.tilewidth) * (this.height / this.tileheight);
	},
	encode: function() {
	
		var tileset = {
			firstgid	: this.firstgid,
			image		: this.image,
			name		: this.name,
			tilewidth	: this.tilewidth,
			tileheight	: this.tileheight,
			spacing		: this.spacing,
			margin		: this.margin,
			height		: this.height,
			width		: this.width
		}
		
		return tileset;
	}
})