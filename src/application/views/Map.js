View.Map = new JS.Class(Application_Object, {

	initialize: function(map) {

		this.init();
		
		this.map = map;
		this._map = '';
	},
	draw: function() {
		var map = $('<div class="map">'),
			container = $('<div class="map-container">'),
			overlay = $('<div class="overlay">'),
			canvas,
			width,
			height;

		width = this.map.width * this.map.tilewidth;
		height =  this.map.height * this.map.tileheight;

		container.width(width);
		container.height(height);

		container.append(overlay);
		map.append(container);

		this._map = map;

		return map;
	},
	setCursor : function(cursor) {
		
		cursor.setEvents($(this._map).find('div.map-container'));
		$(this._map).find('div.map-container').append(
			cursor.draw()
		)

	}

});