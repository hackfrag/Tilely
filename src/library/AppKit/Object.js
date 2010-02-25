var Application_Object = new JS.Class({

	init: function(){
		this.observers = [];
		this.delegate ='';
	},
	notify : function(notificationName) {
		
		var args = this.arrayFrom(arguments).slice(1);
		
		if(this.observers.length != 0) {
			this.observers.forEach(function(item, i) {
				
				
				if(item.notificationName == notificationName){
					
					item.callback.apply(this,args)
				}
			
			
			});
		}

		if(this.delegate) {
		
			if(this.delegate[notificationName]) {
				
				this.delegate[notificationName].apply(this.delegate,args)
			}
		}
	},
	subscribe: function(notificationName, callback) {

		var object = {
			'notificationName'	: notificationName,
			'callback'			: callback
		};
		this.observers.push(object);
	},
	setDelegate: function(delegate) {
		this.delegate = delegate;
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

