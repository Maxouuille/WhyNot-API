var express = require('express');
var router = express.Router();

const {MongoClient} = require('../../config');
const {MONGODB_URI} = require('../../config');
const {dbName} = require('../../config');

const {verifyTokenAdmin} = require('../../middleware.js');
const {verifyToken} = require('../../middleware.js');
const {ObjectId} = require('../../config.js');
const {dateNow} = require('../../config');
const {upload} = require('../../config');

router.put('/single', upload.single('image'), async (req, res, next) => {
    res.send({
        toz: "watozzzz"
    })
});

module.exports = router;
