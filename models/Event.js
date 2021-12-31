exports.Event_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "event",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            fb_post_link: DataTypes.STRING,
            location: DataTypes.STRING,
            catergory: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
