const express = require('express');
const controllers = require('../app/controllers');
const swaggerUI = require('swagger-ui-express');
const swgDoc = require('../doc/OBYKAO26_1-template-1.0.0-resolved.json');
const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc));

apiRouter.get('/', controllers.api.main.handleGetRoot);
/**
 * Authentication Resource
 * */
apiRouter.post('/api/v1/login', controllers.api.v1.authController.handleLogin);
apiRouter.post('/api/v1/login/admin', controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.authController.handleLogin);
apiRouter.post('/api/v1/register', controllers.api.v1.authController.handleRegister);

//current user
apiRouter.get('/api/v1/user', controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);


//user Routes
apiRouter.get('/api/v1/users', controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.list);
apiRouter.put('/api/v1/users/:id', cloudStorage.single('photo'), controllers.api.v1.userController.update);
apiRouter.get('/api/v1/users/:id', controllers.api.v1.userController.show);
apiRouter.delete('/api/v1/users/:id', controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.destroy);



module.exports = apiRouter;