module.exports = (sequelize, DataTypes) => {
  const Ask = sequelize.define('Ask', {
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'accepted', 'done', 'cancelled'],
      default: 'pending',
    },
  });

  return Ask;
};
