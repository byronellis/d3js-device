d3dev.stats.summary = function() {
	var value = function(v) { return v; }
	var n     =  0;
	var min   =  Infinity;
	var max   = -Infinity;
	var sum   = 0;
	var sum2  = 0;
	
	
	function summary(v) {
		v = value(v);
		if(!isNaN(v)) {
			n++;
			sum  += v;
			sum2 += v*v;
			if(v < min) min = v;
			if(v > max) max = v;
		}
		return v;
	}
	summary.value = function(_) {
		if(!arguments.length) return value;
		value = _;
		return summary;
	}
	
	//Summary functions
	summary.max  = function() { return max;    }
	summary.min  = function() { return min;    }
	summary.range= function() { return [min,max]; }
	summary.width= function() { return max-min; }
	summary.avg  = function() { return sum/n;  }
	summary.avg2 = function() { return sum2/n; }
	summary.sum  = function() { return sum; }
	summary.sum2 = function() { return sum2; }
	summary.n    = function() { return n; }
	summary.var  = function() { 
		var b = summary.avg();
		var a = summary.sum2()/(n-1);
		return a - (n*b*b)/(n-1);
	}
	summary.sd   = function() { return Math.sqrt(summary.var()); }
	
	return summary;
};
