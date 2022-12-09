//main app router
const {Router} = require('express');
const app_router = Router();
const controller = require('../controllers/OperationsController');
 
app_router.get('/',controller.test);

module.exports = app_router; 