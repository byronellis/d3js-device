var self = this,
		globals = ["document","window","navigator","CSSStyleDeclaration","d3","d3dev"],
		globalValues = {};
	
globals.forEach(function(g) {
		if(g in self) globalValues[g] = self[g];
});

document  = require("jsdom").jsdom("<html><head></head><body></body></html>");
window    = document.createWindow();
navigator = window.navigator;

require("./d3device");

module.exports = d3dev;

globals.forEach(function(g) {
	if(g in globalValues) self[g] = globalValues[g]; else delete self[g];
});