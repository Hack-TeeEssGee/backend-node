exports.SocEvent_Model = function (sequelize, DataTypes) {
    return sequelize.define(
        "SOCIETY-EVENT",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            fb_post_link: DataTypes.STRING,
            location: DataTypes.STRING,
            start_date: DataTypes.DATEONLY,
            end_date: DataTypes.DATEONLY,
            society_id: DataTypes.UUID,
        },
        {
            tableName: "society_event",
            timestamps: false,
        }
    );
};
