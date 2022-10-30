#!/bin/bash

set -ex

# build frontend
cd interface
yarn install
yarn build

cd ../

# copy frontend build into backend serving dir
rm -rf backend/src/main/resources/public
cp -r interface/build backend/src/main/resources/public

# build/package backend
cd backend
mvn package -DskipTests

set +x

echo "Built ./backend/target/hpc_interface-0.0.1-SNAPSHOT.jar !"
echo "Deploy as you wish..."
