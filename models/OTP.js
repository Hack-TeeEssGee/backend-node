exports.OTP_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "OTP",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            otp: DataTypes.STRING,
            expiration_time: DataTypes.DATE,
            verified: {
                type: DataTypes.BOOLEAN,
                default: false,
                allowNull: true,
            },
        },
        {
            tableName: "otp",
            timestamps: false,
        }
    );
};
