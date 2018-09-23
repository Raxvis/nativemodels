yarn build
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md
cd dist
npm version patch
npm publish
cp ./package.json ./../package.json
cd ./../
git add package.json
git commit -m "Updated package.json to latest version"