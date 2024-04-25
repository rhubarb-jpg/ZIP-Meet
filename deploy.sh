#!/usr/bin/bash
# This not only serves as a runnable script to deploy, but also a document
# in order to detail how to build it
# This is the build process for the frontend
cd frontend
npm run build
cd ..
# Once we have a working backend and server, change this line to something else
npx firebase deploy --only hosting

