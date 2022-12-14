const rabbitService = require('../services/RabbitMQ');
const httpHandler = require('../services/handler');
const key_server_URL = "http://key-server:3000";
const authenticate_server_URL = "http://authentication-server:5003";

class OperationsController{


    async test(req,res){
        let response = {message:'docker 🐳 is lit!!'};   
        await rabbitService.PublishToQueue('Test',response.toString());
        res.status(200).send(response);
    }

    async sign(req,res){
        const key = await httpHandler.Post(`${key_server_URL}/keys`, req.body)
        res.status(200).send(key.toString());

    }

    async authenticate(req,res){
        const result = await httpHandler.Post(`${authenticate_server_URL}/authenticate`,req.body);
        res.status(200).send(result);
    }

}

module.exports = new OperationsController();