(function() {
  d3dev = {
    version: "0.0.1"
  };
  d3dev.device = function(myid) {
    function device(g) {}
    if (!d3dev.device.id) d3dev.device.id = 0;
    var id = myid || "d3-device-" + d3dev.device.id++;
    return device;
  };
  d3dev.stats = {};
  d3dev.stats.summary = function() {
    function summary(v) {
      v = value(v);
      if (!isNaN(v)) {
        n++;
        sum += v;
        sum2 += v * v;
        if (v < min) min = v;
        if (v > max) max = v;
      }
      return v;
    }
    var value = function(v) {
      return v;
    };
    var n = 0;
    var min = Infinity;
    var max = -Infinity;
    var sum = 0;
    var sum2 = 0;
    summary.value = function(_) {
      if (!arguments.length) return value;
      value = _;
      return summary;
    };
    summary.max = function() {
      return max;
    };
    summary.min = function() {
      return min;
    };
    summary.range = function() {
      return [ min, max ];
    };
    summary.width = function() {
      return max - min;
    };
    summary.avg = function() {
      return sum / n;
    };
    summary.avg2 = function() {
      return sum2 / n;
    };
    summary.sum = function() {
      return sum;
    };
    summary.sum2 = function() {
      return sum2;
    };
    summary.n = function() {
      return n;
    };
    summary.var = function() {
      var b = summary.avg();
      var a = summary.sum2() / (n - 1);
      return a - n * b * b / (n - 1);
    };
    summary.sd = function() {
      return Math.sqrt(summary.var());
    };
    return summary;
  };
  d3dev.stats.fit = function() {
    function fit(v) {
      var xy = x(v) * y(v);
      if (!isNaN(xy)) {
        nXY++;
        sumXY += xy;
      }
      return xy;
    }
    var x = summary().value(function(v) {
      return v[0];
    });
    var y = summary().value(function(v) {
      return v[1];
    });
    var sumXY = 0;
    var nXY = 0;
    fit.fit = function() {
      var xybar = sumXY / nXY;
      var beta = (xybar - x.avg() * y.avg()) / (x.avg2() - x.avg() * x.avg());
      return [ y.avg() - beta * x.avg() ];
    };
    fit.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return fit;
    };
    fit.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return fit;
    };
  };
  d3dev.stats.nclass = function(name) {
    function nclass(s) {
      return method(s);
    }
    methods = {
      sturges: function(s) {
        return Math.ceil(Math.log(s.n()) / Math.log(2) + 1);
      },
      scott: function(s) {
        var h = 3.5 * s.sd() * Math.pow(s.n(), -1 / 3);
        return h > 0 ? Math.ceil(s.width() / h) : 1;
      }
    };
    var method = methods[name || "sturges"];
    nclass.method = function(_) {
      if (!arguments.length) return method;
      if (typeof _ == "string") method = methods[_]; else method = _;
      return nclass;
    };
    return nclass;
  };
})();