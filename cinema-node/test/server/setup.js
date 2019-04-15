const sinon = require('sinon');
let db;
const auth = require('../../middlewares/auth');

beforeEach(() => {
    db = require('../../connectors/mongoDB');
    sinon.stub(db, 'connectMongo').resolves("OK");
    sinon.stub(db, 'isConnected').resolves('connected');

    sinon.stub(auth, 'required').callsFake(auth.optional);
    sinon.stub(auth, 'adminOnly').callsFake((req, res, next) => {
        next();
    });
});

afterEach(() => {
    db.isConnected.restore();
    db.connectMongo.restore();

    auth.required.restore();
    auth.adminOnly.restore();
});