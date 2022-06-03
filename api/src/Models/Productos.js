const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Producto", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		precio: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		caracteristicas: {
			type: DataTypes.JSON,
			// allowNull: false,
		},
		funcionalidades: {
			type: DataTypes.JSON,
			// allowNull: false,
		},
		accesorios: {
			type: DataTypes.JSON,
			// allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			// allowNull: false,
		},
		categories: {
			type: DataTypes.JSON, // Protria pertenecer a muchas categorias
			// allowNull: false,
		},
		estado: {
			type: DataTypes.ENUM("Nuevo", "Usado"),
		},
	});
};
