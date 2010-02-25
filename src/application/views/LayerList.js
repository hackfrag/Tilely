
View.LayerList = new JS.Class(UIListView, {
	

	/**
	 * Datasource methodes
	 */
	rowAtIndex: function(index) {
		var cell	= $('<div>'),
			input	= $('<input>'),
			label	= $('<span>'),
			layer	= this.datasource[index],
			self	= this;

		input
			.attr('type','checkbox')
			.click(function() {
				var status = $(this).is(':checked');
				self.notify('layerStatusDidChanged', index, status);
			})

		if(layer.visible) {
			input.attr('checked','checked')
		}

		label
			
			.html(layer.name)
		cell
			.append(input)
			.append(label)

		/*
		 *
			*/

		return cell;
	},
	editRowAtIndex: function(index) {
		var cell	= $('<div>'),
			form	= $('<form>'),
			label	= $('<input>'),
			layer	= this.datasource[index],
			self	= this;

	

		label
			.attr('type','text')
			.val(layer.name)
			.blur(function() {
				
				form.submit(formsubmit);
			})
			.focus();

		form
			.append(label)
			.submit(formsubmit);
		cell

			.append(form)

	
		var formsubmit = function() {
			self.notify('layerNameDidChanged', label.val(), index);
			self.setEditIndex(-1);
			self.setActiveIndex(index);
			self.reload();
			return false;
		}
		return cell;
	},

	/**
	 * Delegate methodes
	 */
	afterEditRowAppend: function(li) {
		$(li).find('input').focus();
	},
	isSortable: function() {
		return true;
	},
	orderDidChange: function(event, ui) {
		this.notify('layerOrderDidChanged');
	},
	isSelectAbleAtIndex: function(index) {
		return true;
	},
	isEditAbleAtIndex: function(index) {
		return true;
	},
	didSelectedAtIndex: function(index) {
		this.notify('didSelectLayerAtIndex', this.datasource[index], index);
	},
	setEditIndex: function(index) {
		this.edit	= index;
		return this;
	},
	setActiveIndex: function(index) {
		this.active = index;
		return this;
	},
	isActive: function(index) {
		return (this.active == index);
	}
});