var Application_Object = new JS.Class({

	init: function(){
		this.observers = [];
		
	},
	notify : function(notificationName) {
		
		var args = this.arrayFrom(arguments).slice(1);
		
		if(this.observers.length != 0) {
			this.observers.forEach(function(item, i) {
				
				
				if(item.notificationName == notificationName){
			
					item.callback.apply(this, args)
				}
			
			
			});
		}
	},
	subscribe: function(notificationName, callback) {

		var object = {
			'notificationName'	: notificationName,
			'callback'			: callback
		};
		this.observers.push(object);
	},
	
	arrayFrom: function arrayFrom(object) {
        if(!object) {
            return [];
        }
        var length = object.length || 0;
        var results = new Array(length);
        while (length--) {
            results[length] = object[length];
        }
        return results;
    }
});
