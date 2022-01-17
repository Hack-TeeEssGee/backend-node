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
            status: {type: DataTypes.STRING, defaultValue: "pending"},
            description: DataTypes.STRING,
            amount: DataTypes.INTEGER,
            society_id: DataTypes.UUID,
            remark: DataTypes.STRING,
            fileName:DataTypes.STRING
        },
        {
            tableName: "bill",
            timestamps: false,
        }
    );
};
