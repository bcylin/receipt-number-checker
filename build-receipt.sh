#!/bin/sh

npm install

echo "\n\033[31mStash uncommitted changes\033[0m"
git stash save "Build process"
echo ""
read -p "[^C] to cancel / [Return] to continue: "

# Link built JavaScript and CSS
perl -pi -e "s/\/\/\ 'js\//'js\//g" receipt.html
perl -pi -e "s/stylesheet\/less/stylesheet/g" receipt.html
perl -pi -e "s/\.less\"/\.css\"/g" receipt.html
perl -pi -e "s/^\s.+less.min.js\"><\/script>//g" receipt.html

# Link share functions
if [ -d ../projects-share/ ]; then
  echo "\n""# Found share functions.""\n"
  rm -rf js/private
  mkdir js/private
  cp -v ../projects-share/*.js ./js/private/
  echo "require(['private/share', 'private/signature']);" >> js/receipt.js
fi

# Build
./node_modules/html-minifier/cli.js --minify-js --remove-comments --collapse-whitespace -o receipt.min.html receipt.html
echo "" >> receipt.min.html

cd js
node lib/r.js -o build-receipt.js
node lib/r.js -o build-receipt-mobile.js
cd ..

./node_modules/less/bin/lessc --clean-css="--s1 --advanced" css/receipt.less > css/receipt.css
echo "" >> css/receipt.css

# Setup directory for deployment
deploy=receipt

if [ -d $deploy ]; then
	find $deploy -type f -execdir rm '{}' \;
else
	mkdir $deploy
fi
test -d $deploy"/css" || mkdir $deploy"/css"
test -d $deploy"/css/lib" || mkdir $deploy"/css/lib"
test -d $deploy"/css/plugin" || mkdir $deploy"/css/plugin"
test -d $deploy"/js" || mkdir $deploy"/js"
test -d $deploy"/js/lib" || mkdir $deploy"/js/lib"

mv -fv receipt.min.html $deploy"/index.html"
mv -fv css/receipt.css $deploy"/css"
cp -fv css/lib/reset.css $deploy"/css/lib"
cp -fv css/plugin/bootstrap-receipt.min.css $deploy"/css/plugin"
mv -fv js/receipt-built.js $deploy"/js"
mv -fv js/receipt-mobile-built.js $deploy"/js"
cp -fv js/lib/require.min.js $deploy"/js/lib"
cp -rfv media $deploy
cp -rfv data $deploy
cp -rfv img $deploy

# Clean up
git checkout -- .
echo ""

# Check out gh-pages
git checkout gh-pages

# Update built files
echo ""
rm -rf ./css ./js ./data ./img index.html
mv ./receipt/* .
rmdir ./receipt
