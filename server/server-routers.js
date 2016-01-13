var authorization = require('./middleware/authorization');
var userController = require('./controllers/user-controller');

module.exports = function(app) {
    app.post('/api/v1/user', userController.signup);
    app.post('/api/v1/user/login', userController.login);
    app.get('/api/v1/user/me', authorization.ensureAuthorized, userController.me);
    app.post('/api/v1/user/me/comparePassword', authorization.ensureAuthorized, userController.comparePassword);
    app.get('/api/v1/user/:id', userController.findById);
    app.post('/api/v1/user/uploadAvatar', userController.uploadAvatar);
    app.patch('/api/v1/user/me', authorization.ensureAuthorized, userController.update);
    app.delete('/api/v1/user/logout', authorization.ensureAuthorized, userController.logout);
};