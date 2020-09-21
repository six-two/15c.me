#!/usr/bin/bash
pwd

APP_PATH='shortcuts'

rm -f tmp;
mv build tmp;
mkdir build;
mv tmp build/${APP_PATH}

mv build/${APP_PATH}/root/* build
rm -r build/${APP_PATH}/root
cp build/404.html build/index.html
