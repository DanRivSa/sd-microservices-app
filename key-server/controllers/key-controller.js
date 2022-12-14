const keyService = require("../services/key-service");

//controlador de operaciones del servidor de claves
class KeyController{
    //operacion de generacion de clave
    async PostKey(req,res){
        const key = keyService.GenerateKey(req.body);
        res.status(200).send(key.toString());
    }

}

module.exports = new KeyController();