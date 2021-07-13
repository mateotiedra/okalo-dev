module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define(
    'bid',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      edition: {
        type: DataTypes.STRING,
      },
      condition: {
        type: DataTypes.STRING,
      },
      annotation: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'no deal',
      },
    },
    {
      paranoid: true,
    }
  );

  Bid.associate = (models) => {
    Bid.belongsTo(models.user, {
      as: 'bidsOwned',
      foreignKey: {
        name: 'ownerUuid',
        allowNull: false,
      },
    });

    Bid.belongsToMany(models.user, {
      as: 'asks',
      through: models.ask,
    });
  };

  return Bid;
};
