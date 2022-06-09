const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Producto",
		{
		nombre: {
			type: DataTypes.STRING,
		},
		marca: {
			type: DataTypes.STRING,
		},
		precio: {
			type: DataTypes.JSON,
		},
		caracteristicas: {
			type: DataTypes.JSON,
		},
		funciones: {
			type: DataTypes.STRING,
		},
		stock: {
			type: DataTypes.INTEGER,
		},
		categoria: {
			type: DataTypes.ARRAY(DataTypes.JSON), //provisorio hasta tener las relaciones y las tablas para realizar pruebas(sigo en eso)
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

