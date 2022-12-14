//main app router
const {Router} = require('express');
const app_router = Router();
const controller = require('../controllers/OperationsController');
 
app_router.get('/',controller.test);
app_router.post('/sign',controller.sign);
app_router.post('/authenticate',controller.authenticate);

module.exports = app_router; 