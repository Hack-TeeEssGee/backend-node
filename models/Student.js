exports.Student_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "Student",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            roll_no: DataTypes.STRING,
            email: DataTypes.STRING,
            certificates: {
                type: DataTypes.STRING,
                defaultValue: "[]",
            },
        },
        {
            tableName: "student",
            timestamps: false,
        }
    );
};
