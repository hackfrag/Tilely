UIListViewStyleList = {
	name		: 'list',
	container	: '<ul>',
	item		: '<li>'
};

UIListViewStyleSelect = {
	name		: 'select',
	container	: '<select>',
	item		: '<option>'
};
var UIListView = new  JS.Class(Application_Object, {


	initialize: function(datasource, listViewStyle) {


		this.init();

		this._style = listViewStyle;
		if(!this._style) {
			this._style = UIListViewStyleList;
		}

		this.datasource = datasource;
		this.delegate = this;

		
		this._view = $('<div>');

	},
	
	rowAtIndex: function(index) {
		
	},
	draw: function() {
		var self = this;
		
		this._view.empty();
		
		var ul = $(self._style.container),
			li;



		this.datasource.forEach(function(item, i) {
			li = $(self._style.item).append(self.rowAtIndex(i));
			
			if(self._style.name == "list") {
				if(self.isSortable()) {
					li.append('<span class="draghandle">&nbsp;</span>')
				}
				if(self.isSelectAbleAtIndex()) {
					li.click(function() {
						self.didSelectedAtIndex(i);
					})
				}
				li.hover(function() {
					$(this).addClass('hover');
				},function() {
					$(this).removeClass('hover');
				})		
			}

			li.attr('value', i);

			li.appendTo(ul);
		});

		if(this.isSortable()) {
			ul.addClass('ui-sortable');

		}
		if(self._style.name == "select") {
			ul.change(function() {
				self.selectionDidChange($(this).val())
			})
		}
		ul.appendTo(this._view);
		
		UIKit.parse(this._view);

		if(this.isSortable()) {
			var listview = this._view.find('ul');
			listview.sortable('option', 'stop', function(event, ui) {
				self.orderDidChange(event, ui);
			});
		}
		

	

		return this._view;
	
	},
	isSortable: function() {
		return false;
	},
	orderDidChange: function(event, ui) {

	},
	selectionDidChange: function(index) {

	},
	isSelectAbleAtIndex: function(index) {
		return true;
	},
	didSelectedAtIndex: function(index) {
		
	},
	reload: function() {
	
		$(this._view).empty();
		this.draw();
	}
});