exports.News_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "NEWS",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            location: DataTypes.STRING,
        },
        {
            tableName: "news",
            timestamps: true,
            updatedAt: false,
        }
    );
};
