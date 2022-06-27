const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "BotClave", {
            clave: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            respuesta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, { timestamps: false }
        );
};