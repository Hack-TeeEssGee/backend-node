exports.Society_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "SOCIETY",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            tableName: "society",
            timestamps: false,
        }
    );
};
