cd site
next build
next export
touch out/.nojekyll
touch out/CNAME
echo "nativemodels.js.org" >> out/CNAME
cd ../
git add site/out/
git commit -m "Deploy to gh-pages"
git subtree push --prefix site/out origin gh-pages
