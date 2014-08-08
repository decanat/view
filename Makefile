REPORTER ?= spec

test: build
	@./node_modules/.bin/mocha-phantomjs ./test/index.html \
		--setting localToRemoteUrlAccessEnabled=true \
		--setting webSecurityEnabled=false \
		--reporter $(REPORTER)

lint: ./lib/*.js
	@./node_modules/.bin/jshint $^ \
		--reporter ./node_modules/jshint-stylish/stylish.js

build-dev:
	@./node_modules/.bin/component build \
		--dev

build:
	@./node_modules/.bin/component build

uglify: build
	@./node_modules/.bin/uglifyjs build/build.js \
		--output ./build/build.min.js \
		--compress \
		--mangle \
		--reserved 'require,exports' \
		--screw-ie8

clean:
	rm -fr build components

.PHONY: test lint build build-dev uglifyjs gzip clean test
