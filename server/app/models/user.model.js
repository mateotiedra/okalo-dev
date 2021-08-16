module.exports = (sequelize, DataTypes) => {
  const attributes = {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    sales: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    phone: {
      type: DataTypes.STRING,
    },
    school: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    confirmationCode: {
      type: DataTypes.STRING,
    },
  };

  const options = {};

  const User = sequelize.define('user', attributes, options);

  User.associate = (models) => {
    User.hasMany(models.bid, {
      as: 'bidsOwned',
      foreignKey: {
        name: 'ownerUuid',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return User;
};
