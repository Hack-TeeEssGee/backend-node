exports.OfficialImages_Model = function (sequelize, DataTypes) {
  return sequelize.define(
      "OfficialImages",
      {
          id: {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true,
          },
          email: DataTypes.STRING,
          location: DataTypes.STRING,
      },
      {
          tableName: "official_images",
          timestamps: false,
      }
  );
};
