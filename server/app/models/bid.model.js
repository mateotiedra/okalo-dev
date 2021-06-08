module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('bid', {
    title: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    edition: {
      type: Sequelize.STRING,
    },
    condition: {
      type: Sequelize.STRING,
    },
    annotation: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
