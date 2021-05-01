module.exports = (app) => {
  const user = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/api/signup', user.verifyUsername, user.verifyEmail, user.create);

  // Login the user
  app.post('/api/login/username', user.loginByUsername);

  // Retrieve a single Customer with customerId
  //app.get('/user/:customerId', user.findOne);

  // Update a Customer with customerId
  //app.put('/user/:customerId', user.update);

  // Delete a Customer with customerId
  //app.delete('/user/:customerId', user.delete);

  // Create a new Customer
  //app.delete('/user', user.deleteAll);
};
