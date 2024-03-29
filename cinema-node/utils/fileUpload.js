const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.CINEMA_AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.CINEMA_AWS_ACCESS_KEY_ID,
    region: 'us-east-1' // region of your bucket
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cinema-project',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

module.exports = upload;
