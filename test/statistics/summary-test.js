require("../env");

var vows = require("vows"),assert=require("assert");
var suite = vows.describe("d3dev.stats.summary");

suite.addBatch({
	"summary":{
		topic: function() {
			var s = d3dev.stats.summary();
			[1,2,3,4,5,6,7,8,9,10].forEach(s);
			return s;
		},
		"values":{
			"min":function(s) { assert.isTrue(s.min() == 1); },
			"max":function(s) { assert.isTrue(s.max() == 10); },
			"sum":function(s) { assert.inDelta(s.sum(),55,1e-6); },
			"sum2":function(s) { assert.inDelta(s.sum2(),385,1e-6); },
			"mean": function(s) { assert.inDelta(s.avg(), 5.5, 1e-6);    },
			"mean2": function(s) { assert.inDelta(s.avg2(), 38.5, 1e-6); },
			"var": function(s) { assert.inDelta(s.var(),9.166667,1e-6); },
			"sd": function(s) { assert.inDelta(s.sd(),3.02765,1e-6); }
			
		}
	}
});

suite.export(module);
