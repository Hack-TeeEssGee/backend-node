exports.Event_Model = function (sequelize, DataTypes) {
  return sequelize.define(
    "event",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
