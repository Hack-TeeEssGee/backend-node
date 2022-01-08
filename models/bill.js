exports.Bill_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "BILL",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            key: DataTypes.STRING,
            status: DataTypes.STRING,
            description: DataTypes.UUID,
        },
        {
            tableName: "bill",
            // timestamps: false,
        }
    );
};
