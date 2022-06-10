const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Historial",
		{
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		}
	);
};

