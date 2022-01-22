exports.Grievence_Model = function (sequelize, DataTypes) {
  return sequelize.define(
      "Grievence",
      {
          id: {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true,
          },
          name: DataTypes.STRING,
          student_email: DataTypes.STRING,
          description: DataTypes.STRING,
          type: DataTypes.STRING,
          resolutions: DataTypes.STRING,
          key:DataTypes.STRING,
          status: {type: DataTypes.STRING, defaultValue: "Pending"},
      },
      {
          tableName: "grievence",
          timestamps: false,
      }
  );
};
