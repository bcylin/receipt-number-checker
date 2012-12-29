#!/bin/sh

cd js
node lib/r.js -o build-receipt.js
node lib/r.js -o build-receipt-mobile.js
cd ..

lessc -x css/receipt.less > css/receipt.css

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

cp -fv receipt.html $deploy"/index.html"
cp -fv css/receipt.css $deploy"/css"
cp -fv css/lib/reset.css $deploy"/css/lib"
cp -fv css/plugin/bootstrap-receipt.min.css $deploy"/css/plugin"
cp -fv js/receipt-built.js $deploy"/js"
cp -fv js/receipt-mobile-built.js $deploy"/js"
cp -fv js/lib/require.min.js $deploy"/js/lib"
cp -fv data/numbers.json $deploy"/data/numbers.json"
cp -rfv img $deploy
