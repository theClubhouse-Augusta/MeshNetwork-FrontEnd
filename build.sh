#!/bin/bash
yarn build
cd ~/Documents/mesh/MeshNetwork-BackEnd/public
rm -rf static/
cd ~/Documents/mesh4/MeshNetwork-FrontEnd/build
cp -r  . ~/Documents/mesh/MeshNetwork-BackEnd/public
cd ~/Documents/mesh/MeshNetwork-BackEnd/
git add .
git commit -m "build"
git archive -v -o myapp10.zip --format=zip
