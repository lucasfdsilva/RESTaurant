const express = require('express');

//Declaring Router Instances
const openRoutes = express.Router();
const protectedRoutes = express.Router();

/*//Middlewares
const authMiddleware = require('./middlewares/auth');*/

//User Controller Routes
const UserController = require('./controllers/UserController.js');

/*
//Session Controller Routes
const SessionController = require('./controllers/SessionController');

//Menu Item Controller Routes
const MenuItemController = require('./controllers/MenuItemController.js');
*/

/*
//Protected Routes will use the Auth Middleware to verify JSON Web Token
protectedRoutes.use(authMiddleware)
*/

//User Controller Routes
openRoutes.get('/users', UserController.index)
openRoutes.get('/users/:id', UserController.view);
openRoutes.post('/users/register', UserController.create);
openRoutes.put('/users/update', UserController.update);
openRoutes.delete('/users/delete', UserController.delete);

/*
openRoutes.get('/users/verify/:verificationToken', UserController.verifyUser);
openRoutes.post('/users/forgot_password', UserController.forgotPassword);
openRoutes.post('/users/reset_password', UserController.reset);

//Session Controller Routes
openRoutes.post('/sessions/login', SessionController.login);

//Menu Item Controller Routes
openRoutes.get('/menu', MenuItemController.index);
openRoutes.get('/menu/:id', MenuItemController.view);
openRoutes.post('/menu/create', MenuItemController.create);
openRoutes.put('/menu/update', MenuItemController.update);
openRoutes.delete('/menu/delete', MenuItemController.delete);
*/

module.exports = {
    openRoutes: openRoutes,
    protectedRoutes: protectedRoutes
}