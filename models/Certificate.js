exports.Certificate_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "CERTIFICATE",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: DataTypes.STRING,
            fileName: DataTypes.STRING,
            position: DataTypes.STRING,
        },
        {
            tableName: "certificate",
            timestamps: false,
        }
    );
};
