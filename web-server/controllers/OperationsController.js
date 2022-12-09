const rabbitService = require('../services/RabbitMQ');

class OperationsController{


    async test(req,res){
        let response = {message:'docker 🐳 is lit!!'};   
        await rabbitService.PublishToQueue('Test',response.toString());
        res.status(200).send(response);
    }
}

module.exports = new OperationsController();