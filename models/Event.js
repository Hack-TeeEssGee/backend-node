exports.Event_Model = function (sequelize, DataTypes) {
  return sequelize.define(
    "event",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      type: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
