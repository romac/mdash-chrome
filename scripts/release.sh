#!/usr/bin/env bash

OLD=$1
NEW=$2

cat js/dashboard.js | sed "s/'$OLD'/'$NEW'/g" > js/dashboard.js
cat manifest.json | sed s/"$OLD"/"$NEW"/g > manifest.json
git add js/dashboard.js manifest.json
git commit -m "Bump version number to $NEW"
git tag v$NEW
git push origin master --tags

git checkout gh-pages
cat updates.xml | sed s/$OLD/$NEW/g > updates.xml
git add updates.xml
git commit -m "Bump latest extension version to $NEW."
git push origin gh-pages

git checkout master
