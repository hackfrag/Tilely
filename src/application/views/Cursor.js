View.Cursor = new JS.Class(Application_Object, {
	

	initialize: function(width, height, tilewidth, tileheight) {

		this.init();
		
		this._border	= '';
		this.mouse		= {
			moving	: false,
			down	: false
		},
		this.isHidden	= false;
		this.border		= 5;
		this.width		= width;
		this.height		= height
		this.widthInPx	= (width * tilewidth) - this.border;
		this.heightInPx = (height * tileheight) - this.border;
	},
	hide : function() {
		this.isHidden = true;
		$(this._cursor).hide();
	},
	show : function() {
		this.isHidden = false;
		$(this._cursor).show();
	},
	remove : function() {
		$(this._cursor).remove();
	},
	draw : function () {
		var cursor = $('<div>'),
			inner1 = $('<div>'),
			inner2 = $('<div>'),
			self = this;

		cursor.addClass('cursor cursor-tile-outter')
			  .attr('id', 'cursor');

		inner1.addClass('cursor-tile-inner1');
		inner2.addClass('cursor-tile-inner2');
		inner2.css({
			width: self.widthInPx,
			height: self.heightInPx
		});

		inner1.append(inner2);
		cursor.append(inner1);


		cursor
		.click(function() {
			if(!self.isHidden) {
				
				//self.notify('click');
			}

		})
		.mousemove(function(event) {
			self.mouse.moving = true;
			if (self.mouse.down && !self.isHidden) {;
				self.notify('click', self.getPosition());
			}
		})
		.mouseout(function(event) {
			self.mouse.moving = false;
		})
		.mousedown(function(event) {
			self.mouse.down = true;
			self.notify('click', self.getPosition());
		})
		.mouseup(function(event) {
			self.mouse.down = false;
		})


		this._cursor = cursor;
		return cursor;

	},
	getElement : function() {
		return this._cursor;
	},
	setEvents : function(selector) {

		var self = this;

		$(selector).mouseleave(function() {
			self._cursor.hide();
		})

		$(selector).mousemove(function(event) {

			self._cursor.show();
			var parent = $(selector).offset(),
				newTop,
				newLeft;

			newTop = (Math.ceil((event.pageY - parent.top) / 32) - 1) * 32;
			newLeft = (Math.ceil((event.pageX - parent.left) / 32) -1) * 32;

			self._cursor.css({
				top: newTop,
				left: newLeft
			});
		})
	},
	setSize : function(width, height) {
		this._cursor.find('div.cursor-tile-inner2')
			.width((width * 32) - this.border)
			.height((height * 32) - this.border);

	},
	getPosition : function() {
		return {
			x: this._cursor.position().left / 32,
			y: this._cursor.position().top / 32
		}
	},
	getSize : function() {

		var inner = this._cursor.find('div.cursor-tile-inner2');
		return {
			width: (inner.width() + this.border) / 32,
			height: (inner.height() + this.border) / 32
		}
	}

});











