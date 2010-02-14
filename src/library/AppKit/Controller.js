var Application_Controller = new JS.Class({

	
	initialize: function() {
		this.request = {};
	},
	init: function() {
		
	},
	setRequest : function(request) {
		this.request = request;
	},
	getRequest : function() {
		return this.request;
	},
	route: function(url) {
		var fc =  Application_Controller_Front.getInstance();
		fc.route(url);
	},
	post: function(url, request) {
		var fc =  Application_Controller_Front.getInstance();
		fc.post(url, request);
	},
	postDispatch : function() {
		
	}
})