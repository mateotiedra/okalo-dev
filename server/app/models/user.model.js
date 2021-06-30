module.exports = (sequelize, Sequelize) => {
  const attributes = {
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
  };

  const options = {};

  const User = sequelize.define('user', attributes, options);

  User.associate = (models) => {
    User.hasMany(models.bid, {
      onDelete: 'cascade',
    });
  };

  return User;
};
