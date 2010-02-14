

var Tileset = new JS.Class(Application_Object, {

	initialize: function(name, image, width, height, tilewidth, tileheight) {

		this.init();
	
		this.firstgid	= 0;
		this.image		= image;
		this.name		= name;
		this.tilewidth	= tilewidth;
		this.tileheight	= tileheight;
		this.width		= width;
		this.height		= height

		this.spacing	= 1;
		this.margin		= 0;
		
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