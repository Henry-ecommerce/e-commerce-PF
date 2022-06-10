const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Producto",
		{
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		marca: {
			type: DataTypes.STRING,
		},
		precio: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		caracteristicas: {
			type: DataTypes.JSON,
		},
		funciones: {
			type: DataTypes.STRING,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		descuento : {
			type : DataTypes.INTEGER
		},
		imagen0: {
			type: DataTypes.STRING,
		},
		imagen1: {
			type: DataTypes.STRING,
		},
		imagen2: {
			type: DataTypes.STRING,
		},
		},
		{ timestamps: false }
	);
};

