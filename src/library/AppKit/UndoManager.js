var UndoManager = new JS.Class({


	initialize: function() {
		this.undoStack = [];
		this.redoStack = [];
	},
	add: function(object) {
		this.undoStack.push(object);
	},
	clear: function() {
		this.undoStack = [];
		this.redoStack = [];
	},
	undo: function() {
		if(this.undoStack.length) {
			var object = this.undoStack[this.undoStack.length -1];

			this.redoStack.push(object);
			
			object.undo();

			this.undoStack.pop();
		}
		
	},
	redo: function() {
		if(this.redoStack.length) {
			var object = this.redoStack[this.redoStack.length -1];

			this.undoStack.push(object);
			
			object.redo();

			this.redoStack.pop();
		}
		
	}
	
});