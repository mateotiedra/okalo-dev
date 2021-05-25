module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    insta: {
      type: Sequelize.STRING,
    },
    snap: {
      type: Sequelize.STRING,
    },
    school: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'pending',
    },
    confirmationCode: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
