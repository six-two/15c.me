#!/usr/bin/bash
pwd

# Config options
APP_PATH='shortcuts'

# Make sure the tmp dir does not exist
rm -f tmp

# Move /build to /build/${APP_PATH}
mv build tmp
mkdir build
mv tmp build/${APP_PATH}

# Move some files in the root directory
mv build/${APP_PATH}/sc.json build/
mv build/${APP_PATH}/redirect.html build/404.html
mv build/${APP_PATH}/redirect.js build/


# Use 404.html as index.html too
cp build/404.html build/index.html

