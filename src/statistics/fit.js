//Simple least squares fit of 2 variables. Also useful for computing various
//summary statistics of X and Y.
d3dev.stats.fit = function() {
	var x = summary().value(function(v) { return v[0]; });
	var y = summary().value(function(v) { return v[1]; });
	
	var sumXY = 0;
	var nXY   = 0;
	
	function fit(v) {
		var xy = x(v)*y(v);
		if(!isNaN(xy)) {
			nXY++;
			sumXY += xy;
		}
		return xy;
	}
	fit.fit = function() {
		var xybar = sumXY/nXY;
		var beta  = (xybar - x.avg()*y.avg())/(x.avg2() - x.avg()*x.avg());
		return [y.avg() - beta*x.avg()];
	}
	
	fit.x = function(_) {
		if(!arguments.length) return x;
		x = _;
		return fit;
	}
	fit.y = function(_) {
		if(!arguments.length) return y;
		y = _;
		return fit;
	}
	
};
