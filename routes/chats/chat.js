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

router.get('/chat/:id', verifyToken, async (req, res, next) => {
    const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('chat');
        let result = await col.find({ $or: [{emailSender: req.query.id}, {emailReciver: req.query.id} ] }).toArray();
        res.send({
            chats: result,
            error: null
        });
    } catch (err) {
        res.send(err);
    }
    client.close();
});

router.get('/', verifyToken, async (req, res, next) => {
    const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('chat');
        let result = await col.find().toArray();
        res.send({
            chats: result,
            error: null
        });
    } catch (err) {
        res.send(err);
    }
    client.close();
});

router.post('/send', verifyToken, async (req, res, next) => {
    const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('chat');
        await col.insertOne({
            emailSender: req.body.emailSender,
            emailReciver: req.body.emailReciver,
            message: req.body.message,
            date:dateNow()
            
        });
        let result = await col.find().toArray();
        res.send({
            chats: result,
            error: null
        });
    } catch (err) {
        res.send(err);
    }
    client.close();
});

module.exports = router;