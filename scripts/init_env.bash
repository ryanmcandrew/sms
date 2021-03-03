#!/bin/bash

$env:BEARER_TOKEN=""
$env:APP_CERT_KEY=""
$env:APP_CERT=""
$env:SERVER_ROOT=""

sudo apt update
sudo install node 
sudo install npm

npm install twitter-autohook
npm install log4js
npm install needle
npm install express
npm install pug
npm install cookie-parser

# faster tf - might not be behaving tf side due to https://github.com/tensorflow/tfjs/pull/3242
# npm install @tensorflow/tfjs-node 

#slower tf
npm install @tensorflow/tfjs

#for mongoDB process
ulimit -n 64000