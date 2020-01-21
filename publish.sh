mkdir -p dist/
rm -rf ./dist/*
cp -r ./src/ ./dist
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md
npm publish dist/
# npm publish --tag canary
rm -rf ./dist