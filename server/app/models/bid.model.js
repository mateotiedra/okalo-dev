module.exports = (sequelize, Sequelize) => {
  const Bid = sequelize.define('bid', {
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

  Bid.associate = (models) => {
    Bid.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Bid;
};
