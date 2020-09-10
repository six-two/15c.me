#!/usr/bin/bash
pwd

# Move /build to /build/edit
rm tmp;
mv build tmp;
mkdir build;
mv tmp build/view

# move /build/view/root/* to /build/*
mv build/view/root/* build
rm -r build/view/root
