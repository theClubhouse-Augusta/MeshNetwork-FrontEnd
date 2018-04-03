#!/bin/bash
yarn build
cd "${my_backend}/public"
rm -rf static/
cd "${my_frontend}/build"
cp -r . "${my_backend}/public"
cd "${my_backend}/public"
git add .
git commit -m "build"
eb deploy