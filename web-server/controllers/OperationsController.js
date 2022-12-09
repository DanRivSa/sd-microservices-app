class OperationsController{

    async test(req,res){
        res.status(200).send({message:'docker 🐳 is lit!!'});
    }
}

module.exports = new OperationsController();