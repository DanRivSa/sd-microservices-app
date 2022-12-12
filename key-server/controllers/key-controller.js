const keyService = require("../services/key-service");


class KeyController{

    async PostKey(req,res){
        const key = keyService.GenerateKey(req.body);
        res.status(200).send(key.toString());
    }

}

module.exports = new KeyController();