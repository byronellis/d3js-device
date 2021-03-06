require("./core/core");

require("util").puts(JSON.stringify({
	"name":"d3-device",
	"version": d3dev.version,
	"description": "A R-like device abstraction for D3",
	"keywords": ["visualization","svg"],
	"homepage": "",
	"author": {"name":"Byron Ellis","url":"http://byronellis.name"},
	"repository": {"type":"git","url":"http://github.com/byronellis/d3-device.git"},
	"main":"index.js",
	"browserify":"index-browserify.js",
	"dependencies":{"d3":"2.10.x"},
	"devDependencies":{"uglify-js":"1.2.3","vows":"0.6.x"}
}, null, 2));