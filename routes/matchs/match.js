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


router.get('/', verifyToken, async (req, res, next) => {
    let result;
    const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('matchs');
        result = await col.find().toArray();
        res.send({
            matchs: result
        });
    } catch (err) {
        res.send(err);
    }
    client.close();
});


router.get('/:id', verifyToken, async (req, res, next) => {
    const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('matchs');
        let result = await col.find({emailUser1: req.query.id}).toArray();
        result += await col.find({emailUser2: req.query.id}).toArray();
        res.send({
            matchs: result
        });

    } catch (err) {
        res.send(err);
    }
    client.close();
});

module.exports = router;