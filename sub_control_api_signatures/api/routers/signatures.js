module.exports = app => {
    const controller = require('../controllers/signatures')();
  
    app.route('/api/signatures')
      .post(controller.createSignature)
      .get(controller.getSignatures);
  
    app.route('/api/signatures/:id')
      .get(controller.getSignatureById)
      .put(controller.updateSignature)
      .delete(controller.deleteSignature);

      app.route('/api/signatures/user/:userId')
        .get(controller.getSignaturesByUserId);
  };
  