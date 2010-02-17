View.Tileset = new JS.Class(Application_Object, {
	initialize: function(tileset) {

		this.init();
		this.selected	= [];
		this.tileset	= tileset;
		this._view		= $('<div>');
	},
	setTileset: function(tileset) {
		this.tileset = tileset;
	
	},
	reload: function() {
		$(this._view).empty();
		$(this._view).html(this.draw());
	},
	draw: function() {

		if(!this.tileset) {
			
			return this._view;
		}
	
		var container = $('<div>'),
			image = $('<img>'),
			self = this,
			width = parseInt(this.tileset.width) / parseInt(this.tileset.tilewidth),
			height = parseInt(this.tileset.height) / parseInt(this.tileset.tileheight);

		container
			.addClass('tileset')
			.attr('id', 'tileset-'+this.tileset.name);
		
		image.attr('src', this.tileset.image);
		image.appendTo(container);
		
		for(var i = 0; i < width; i++) {

			for(var j = 0; j < height; j++) {

				var tile = $('<div>').css({
					top: j * parseInt(self.tileset.tileheight),
					left: i * parseInt(self.tileset.tilewidth)
				});

				tile.attr('id','tile-'+ i +'-'+ j);
				tile.addClass('tile');
				tile.css({
					'background-position':'0px 0px'
				});


				tile.click(function() {

					$('div.tileset').find('div.tile').removeClass('ui-selected');
					$(this).addClass('ui-selected');

					var x = Math.floor($(this).position().left / parseInt(self.tileset.tilewidth)),
						y = Math.floor($(this).position().top / parseInt(self.tileset.tileheight)),
						maxX = self.tileset.width / parseInt(self.tileset.tilewidth),
						maxY = self.tileset.height / parseInt(self.tileset.tileheight);
					
					self.selected = [{
						left: $(this).position().left,
						top: $(this).position().top,
						'x': x,
						'y': y,
						gid: ((y * maxX) + (x + 1) + (self.tileset.firstgid -1)),
						dom: $(this)
					}];
					
					self.notify('afterTileSelected', self.selected, {width: 1, height: 1});

				})
			
				container.append(tile);
			}

		}

		container.selectable({
			filter: 'div.tile',
			delay:100,
			start: function(event, ui) {
				self.selected = [];
			},
			selected: function(event, ui) {

				var x = $(ui.selected).position().left / 32,
					y = $(ui.selected).position().top / 32,
					maxX = self.tileset.width / parseInt(self.tileset.tilewidth),
					maxY = self.tileset.height / parseInt(self.tileset.tileheight);

				self.selected.push({
					left: $(ui.selected).position().left,
					top: $(ui.selected).position().top,
					'x': x,
					'y': y,
					gid: ((y * maxX) + (x + 1) + (self.tileset.firstgid -1)),
				
				});


			},
			stop: function() {

				self.notify('afterTilesSelected', self.selected, self.getSelectedSize());
			}

		});
	
		return container;
	},
	getSelectedSize: function() {
		var oldTop = -1 ,
			oldLeft = -1,
			newWidth = 0,
			newHeight = 0;

		$(this.selected).each(function(i, item) {

			if(oldLeft == item.left || i == 0) {
				oldLeft = item.left;
				newHeight+=1;
			}
			if(oldTop == item.top || i == 0) {
				oldTop = item.top;
				newWidth+=1;
			}


		});

		return {
			height	: newHeight,
			width	: newWidth
		};

	}
});