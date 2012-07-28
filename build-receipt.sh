#!/bin/sh

cd js
node lib/r.js -o build-receipt.js
cd ..

lessc css/receipt.less > css/receipt.css

deploy=deploy

test -d $deploy \
&& find $deploy -type f -execdir rm '{}' \; \
|| mkdir $deploy
test -d $deploy"/css" || mkdir $deploy"/css"
test -d $deploy"/css/lib" || mkdir $deploy"/css/lib"
test -d $deploy"/css/plugin" || mkdir $deploy"/css/plugin"
test -d $deploy"/js" || mkdir $deploy"/js"
test -d $deploy"/js/lib" || mkdir $deploy"/js/lib"

cp -fv receipt.html $deploy"/index.html"
cp -fv css/receipt.css $deploy"/css"
cp -fv css/lib/reset.css $deploy"/css/lib"
cp -fv css/plugin/bootstrap-receipt.min.css $deploy"/css/plugin"
cp -fv js/receipt-built.js $deploy"/js"
cp -fv js/lib/html5shiv.js $deploy"/js/lib"
cp -fv js/lib/require.min.js $deploy"/js/lib"
cp -rfv cache $deploy
cp -rfv img $deploy
