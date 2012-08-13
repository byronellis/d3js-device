# Shamelessly lifted from d3.
NODE_PATH    ?= ./node_modules
JS_COMPILER   = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_BEAUTIFIER = $(NODE_PATH)/uglify-js/bin/uglifyjs -b -i 2 -nm -ns
JS_TESTER     = $(NODE_PATH)/vows/bin/vows
LOCALE       ?= en_US

all:                \
		d3dev.v0.js     \
		d3dev.v0.min.js \
		package.json 

.INTERMEDIATE d3dev.v0.js: \
	src/start.js             \
	d3dev.core.js            \
	d3dev.statistics.js      \
	src/end.js 

d3dev.core.js:        \
	src/core/core.js    \
	src/core/device.js

d3dev.statistics.js: \
	src/statistics/statistics.js \
	src/statistics/summary.js \
	src/statistics/fit.js \
	src/statistics/nclass.js


test: all
	@$(JS_TESTER)

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

d3dev%.js: Makefile
	@rm -f $@
	cat $(filter %.js,$^) | $(JS_BEAUTIFIER) > $@
	@chmod a-w $@

package.json: src/package.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@

clean:
	rm -f d3dev*.js package.json
