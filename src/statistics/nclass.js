d3dev.stats.nclass = function(name) {

	methods = {
		"sturges":function(s) {
			return Math.ceil((Math.log(s.n())/Math.log(2)) + 1);
		},
		"scott":function(s) {
			var h = 3.5*s.sd()*Math.pow(s.n(),-1.0/3.0);
			return h > 0 ? Math.ceil(s.width()/h) : 1;
		}
	};
	
	var method = methods[name || "sturges"];
	
	function nclass(s) {
		return method(s);
	};
	
	nclass.method = function(_) {
		if(!arguments.length) return method;
		if(typeof(_) == "string")
			method = methods[_];
		else
			method = _;
		return nclass;
	};
	
	return nclass;
	
};