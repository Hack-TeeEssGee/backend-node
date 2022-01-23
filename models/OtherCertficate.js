exports.Other_Certificate_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "OTHER CERTIFICATE",
        {
            certificate_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            key: DataTypes.STRING,
            fileName: DataTypes.STRING,
            position: DataTypes.STRING,
            event: DataTypes.UUID,
            email: DataTypes.STRING,
            event_name: DataTypes.STRING,
            event_image: DataTypes.STRING,
        },
        {
            tableName: "other_certificate",
            timestamps: false,
        }
    );
};
