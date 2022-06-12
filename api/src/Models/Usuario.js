const { DataTypes } = require("sequelize");
const { generarId } = require("../helpers/generarId.js");

let Usuarios = (sequelize) =>
  sequelize.define(
    "Usuario",
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
      img: {
        type: DataTypes.STRING, // La semana que viene veo bien como hacer para poder guardar un archivo
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

module.exports = Usuarios;
