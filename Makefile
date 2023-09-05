install: 
	npm ci
	npm link
user-install:
	npm ci --production
	npm link
publish:
	npm publish --dry-run
lint: 
	npx eslint .
