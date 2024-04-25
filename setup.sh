#!/usr/bin/bash
echo "Installing frontend packages"
cd frontend
npm install
echo "Installing backend packages"
cd ../backend
npm install
echo "Installing cloud function packages"
cd ../functions
npm install
cd ..

