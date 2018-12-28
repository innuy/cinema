var mongoose = require('mongoose');

module.exports.connectMongo = function() {

module.exports.connectMongo = () => (
    new Promise((resolve, reject) => {
        //DB Configuration parameters
        let mongoUri =`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
        console.log(mongoUri);
        var mongoDB = mongoose.connect(
            mongoUri,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
            },
        );
        mongoDB
            .then(db => {
                console.log(`Mongo connection established with ${process.env.DB_HOST} host and ${process.env.DB_NAME} database`);
                resolve(mongoDB);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })

    })
);

