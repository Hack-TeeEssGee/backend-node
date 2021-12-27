exports.Official_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "Official",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            status: {
                type: DataTypes.BOOLEAN,
                default: false,
                allowNull: true,
            },
        },
        {
            tableName: "official",
            timestamps: false,
        }
    );
};
