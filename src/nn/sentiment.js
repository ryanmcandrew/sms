// accelerated tensorflow is not working
// const tf = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');

function tfTest() {
    console.log(tf);
}

module.exports.tfTest = tfTest;