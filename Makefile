.PHONY: dev build test clean

dev:
	yarn dev

build:
	yarn build

test:
	yarn test

clean:
	rm -rf dist node_modules
