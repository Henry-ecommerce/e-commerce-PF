const { DataTypes } = require("sequelize");

const { generarId } = require("../helpers/generarId.js");
let Registro = (sequelize) =>
  sequelize.define("Registro", {
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
    token: {
      type: DataTypes.STRING,
      defaultValue: generarId(),
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

module.exports = Registro;
