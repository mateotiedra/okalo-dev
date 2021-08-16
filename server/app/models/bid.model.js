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
        type: DataTypes.ENUM,
        values: ['pending', 'deleted', 'sold'],
        defaultValue: 'pending',
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
  };

  return Bid;
};
