onmessage = function(e){


	var result;
	switch(e.data.action) {
		case 'load':
			result = JSON.parse(e.data.param);
			done(result)
			break;
		case 'save':
			sessionStorage.setObject('map', e.data.param);
			result = true;
			done(result)
			break;
	}

};

function done(result){
	postMessage(result);
}