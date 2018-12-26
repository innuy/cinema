var mongoose = require('mongoose');

module.exports.connectMongo = function() {

    //DB Configuration parameters
    let mongoUri =`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
    console.log(mongoUri);
    mongoose.connect(
        mongoUri,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
        },
    );

    // Get default connection
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Mongo connection error:'));

    console.log(
        `Mongo connection established with ${process.env.DB_HOST} host and ${process.env.DB_NAME} database`
    );
};
