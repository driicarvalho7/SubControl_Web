module.exports = app => {
    const controller = require('../controllers/users')();
      
    app.route('/api/users/getAllUsers')
      .get(controller.getAllUsers);
  
    app.route('/api/users/register')
      .post(controller.createUser);

      app.route('/api/users/login')
        .post(controller.loginUser);
  };
  