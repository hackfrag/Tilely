var View = {};

jQuery.require('library/UIKit/UIListView.js');
jQuery.require('library/UIKit/UIUpload.js');

var UIKit = {

	dom: '',
	
	parse : function(dom) {

		this.dom = dom;
		if(!this.dom) {
			this.dom = $(document);
		}

		this.slider();
		this.sortable();
		this.layout();

		self = this;

		$(window).resize(function() {
			
			self.layout();
		});
		
	},
	layout: function() {
		
		$(document).find('div[layout]').each(function(i,item){
		
			var width,
				height;
			
			height	= $(item).parent().height();
			width	= $(item).parent().width();
			
			if($(item).parent().find('.ui-bar').length) {
				height-=28;
			}
			if($(item).parent().find('h3').length) {
				height-=31;
			}
			$(item).height(height);
			$(item).width(width);
		});
	},
	slider: function() {
		this.dom.find('.ui-slider', this.dom).each(function(){

			var container = $('<dl class="ui-slider-container"><dt>Label</dt><dd></dd></dl>');
			var element = $(this).clone();
			
			container.find('dt').html($(this).attr('label'));
			
			element.slider({
				min: $(this).attr('min'),
				max: $(this).attr('max'),
				value: $(this).attr('value')
			});
			element.appendTo(container.find('dd'))
			$(this).replaceWith(container);
		})
	},
	sortable: function() {
		
		this.dom.find('.ui-sortable').each(function(i, item){
			var that = $(this);
			$(this).sortable({
				handle : '.draghandle',
				containment: 'parent',
				tolerance: 'pointer'
			})
		})
	}
};


(function($) {

	$.fn.addView = function(view) {

		this.each(function() {
		
			$(this).html(view.draw())
			view._view = $(this);
			$(this).data('view', view);
		});

     return this;

   };

})(jQuery);


(function($) {

	$.fn.view = function(view) {
		var object;
		this.each(function() {
			object = $(this).data('view');
			
		});
		return object;

   };

})(jQuery);
