#!/bin/sh

echo "\n\033[31mBuild script removes unstaged changes\033[0m"
read -p "[^C] to cancel / [Return] to continue: "

# Link built JavaScript and CSS
perl -pi -e "s/\/\/\ 'js\//'js\//g" receipt.html
perl -pi -e "s/stylesheet\/less/stylesheet/g" receipt.html
perl -pi -e "s/\.less\"/\.css\"/g" receipt.html
perl -pi -e "s/^\t.+less.min.js\"><\/script>//g" receipt.html
echo "require(['views/share', 'views/signature']);" >> js/receipt.js

# Build
cd js
node lib/r.js -o build-receipt.js
node lib/r.js -o build-receipt-mobile.js
cd ..

lessc -x css/receipt.less > css/receipt.css

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
test -d $deploy"/data" || mkdir $deploy"/data"
test -d $deploy"/media" || mkdir $deploy"/media"

cp -fv receipt.html $deploy"/index.html"
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