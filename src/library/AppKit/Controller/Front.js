var Application_Controller_Front = new JS.Class({

	controllerDir: '',
	controllers : {},
	
	initialize: function(controllerDir) {
		this.controllerDir = controllerDir;

		Application_Controller_Front.instance = this;
	},
	run: function() {

		var that = this,
			route,
			controller;
		
		
		$('button, a').each(function(i, item) {
			var url = $(item).attr('href');
		
			if(url != "#" && url) {
				$(this).click(function() {
					that.route(url);
					return false;
				})
			}
		
		});
	
	},
	parse: function(url) {
		var splittedUrl = url.split('/');

		var controllerClass	=	splittedUrl[0].substr(0, 1).toUpperCase() +
								splittedUrl[0].substr(1) +
								'Controller';
		var action			=	splittedUrl[1] + 'Action';


		if(!this.controllers[controllerClass]) {
			jQuery.require(this.controllerDir  +controllerClass+ '.js');


			this.controllers[controllerClass] = eval("new " + controllerClass + "()");

		}

		if(splittedUrl.length > 2) {
			var request = {};

			for(var i  = 2; i < splittedUrl.length; i++) {
				request[splittedUrl[i]] = splittedUrl[i+1];
			}

		}
		return {
			controller	: controllerClass,
			action		: action,
			'request'	: request
		};
	},
	route: function(url) {
		var controllerObj;

		var route = this.parse(url);

		controllerObj = this.controllers[route.controller];
		controllerObj.setRequest(route.request);

		controllerObj.init();
		controllerObj[route.action]();
		controllerObj.postDispatch();

	},
	post: function(url, request) {

		var controllerObj;

		var route = this.parse(url);

		controllerObj = this.controllers[route.controller];
		controllerObj.setRequest(request);

		controllerObj.init();
		controllerObj[route.action]();
		controllerObj.postDispatch();
	}
});

Application_Controller_Front.extend({
	instance : false,

	getInstance : function() {
		if(Application_Controller_Front.instance) {
			return Application_Controller_Front.instance;
		}
	}
})