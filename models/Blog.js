exports.Blog_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "BLOG",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            title: DataTypes.STRING,
            body: DataTypes.STRING,
            reports: {type: DataTypes.STRING, defaultValue: '[]'},
        },
        {
            tableName: "blog",
            timestamps: true,
            updatedAt: false,
        }
    );
};
