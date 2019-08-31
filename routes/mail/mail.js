var express = require('express');
var router = express.Router();

const {MongoClient} = require('../../config');
const {MONGODB_URI} = require('../../config');
const {JWT_KEY} = require('../../config');
const {dbName} = require('../../config');
const {jwt} = require('../../config');
const {isUsernameValid} = require('../../config');
const {md5} = require('../../config');
const {dateNow} = require('../../config');
const {validator} = require('../../config');
const {upload} = require('../../config');

var mail = require('mail').Mail({
    host: 'smtp.gmail.com',
    username: 'WhyNotEsgi@gmail.com',
    password: 'EsgiWhyNot75'
  });

router.post('/mail', async function (req, res) {
    const client = new MongoClient(MONGODB_URI, {useNewUrlParser: true});
    try {

        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        let result = await col.find({}).toArray();
        var resultUserPreference;
        var emailUser;
        var nameUser;
        res.send(result);
        
        result.forEach((resForEach) => {
            emailUser = resultUserPreference.email;

            if(resForEach.preference == "Femme"){
                nameUser = getUsernameWithGender("Femme");
                
            }else if(resForEach.preference == "Homme"){
                nameUser = getUsernameWithGender("Homme");
            
            }else{
                nameUser = getUsername();
            
            }
            sendMail(emailUser, nameUser);
        
        });

    } catch (err) {
        res.send({
            error: "err"
        })
    }
    client.close();
    res.send("Email envoye");

});

async function getUsernameWithGender(gender){
    try{
        resultUserPreference = await col.find({gender : gender}).toArray();
        let random = Math.random() * resultUserPreference.length;
        return resultUserPreference[random].username;
    }catch(err) {
        res.send({
            error: "err"
        })
    }
    
}

async function getUsername(){
    try{
        resultUserPreference = await col.find({}).toArray();
        let random = Math.random() * resultUserPreference.length;
        return resultUserPreference[random].username;
    }catch(err) {
        res.send({
            error: "err"
        })
    }
}

function sendMail(emailUser, nameUser){
    mailBody = "Bonjour,\n\t Le profil de " + nameUser + " pourrais t'intéreser ! \n\n Ceci est un messages automatique, merci de ne pas y répondre"
    mail.message({
        from: 'noreply@whynot.fr',
        to: [emailUser],
        subject: 'Nous te proposons un profil Utilisateur'
      }).body(mailBody).send(function(err) {
            if (err) throw err;
        });
}

module.exports = router;