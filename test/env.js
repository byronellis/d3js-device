document = require('jsdom').jsdom('<html><head></head><body></body></html>');
window   = document.createWindow();
navigator = window.navigator;

require("../d3dev.v0");