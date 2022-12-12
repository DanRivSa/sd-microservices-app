const rabbitService = require('../services/RabbitMQ');
const httpHandler = require('../services/handler');

class OperationsController{


    async test(req,res){
        let response = {message:'docker 🐳 is lit!!'};   
        await rabbitService.PublishToQueue('Test',response.toString());
        res.status(200).send(response);
    }

    async sign(req,res){
        const key = await httpHandler.Post("http://key-server:3000/keys", req.body)
        res.status(200).send(key.toString());

    }

}

module.exports = new OperationsController();