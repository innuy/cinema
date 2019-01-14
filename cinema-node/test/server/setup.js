const sinon = require('sinon');
let db

beforeEach(() => {
    db = require('../../connectors/mongoDB');
    sinon.stub(db, 'connectMongo').resolves("OK");
    sinon.stub(db, 'isConnected').resolves('connected');
});

afterEach(() => {
    db.isConnected.restore();
    db.connectMongo.restore();
});