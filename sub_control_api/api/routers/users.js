module.exports = app => {
  const userController = require('../controllers/users')();
  const loginController = require('../controllers/login')();

  app.route('/api/users')
    .post(userController.createUser)
    .get(userController.getUsers);

  app.route('/api/users/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

  app.route('/api/login')
    .post(loginController.loginUser);
};
