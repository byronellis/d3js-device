# Shamelessly lifted from d3.
NODE_PATH   ?= ./node_modules
JS_COMPILER  = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_BEAUTIFER = $(NODE_PATH)/uglify-js/bin/uglifyjs -b -i 2 -nm -ns
JS_TESTER    = $(NODE_PATH)/vows/bin/vows
LOCALE      ?= en_US

all:
		d3dev.js
		d3dev.min.js
		package.json


