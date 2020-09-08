const tf = require('@tensorflow/tfjs');

class Brain {
    
    //for model
    compile() {

        const model = tf.sequential(); //seq is any model where outputs of one layer are inputs to next layer

        //input layer
        model.add(tf.layers.dense({
            units:3,
            inputShape: [3]
        }));

        //output layer
        model.add(tf.layers.dense({
            units: 3
        }));

        model.compile({
            loss: 'meanSquaredError', //compile with error functions running
            optimizer: 'sgd'
        });

        return model;
    }


    //run model
    run() {

        const model = this.compile();

        //input layer
        const xs = tf.tensor2d([
            [0.1, 1.0, 0.3],
            [1.0, 1.2, 0.7],
            [0.1, 1.0, 1.0]
        ]);

        //output layer
        const ys = tf.tensor2d([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]);

        //train model
        model.fit(xs,ys, {
            epochs:2, 
        }).then( () => {
            const data = tf.tensor2d( [
                [0.1, 1.0, 0.3],
                [1.0, 1.2, 0.7],
                [0.1, 1.0, 1.0]
            ]);

            const prediction = model.predict(data);
            prediction.print();
        });

    }
}

module.exports.Brain = Brain;