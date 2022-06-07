const { DataTypes } = require("sequelize");
const { generarId } = require("../helpers/generarId.js");

let Registro = (sequelize) =>
  sequelize.define(
    "Registro",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
      token: {
        type: DataTypes.STRING,
        defaultValue: generarId(),
      },
      confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );

module.exports = Registro;
