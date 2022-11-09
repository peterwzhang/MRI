#!/bin/bash

set -ex

# build frontend
cd interface
yarn install
rm -rf build
yarn build

cd ../

# copy frontend build into backend serving dir
rm -rf backend/src/main/resources/public
cp -r interface/build backend/src/main/resources/public

# build/package backend
cd backend
mvn clean package -DskipTests

set +x

echo "Built ./backend/target/hpc_interface.war !"
echo "Deploy as you wish..."
