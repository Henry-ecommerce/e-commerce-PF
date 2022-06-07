const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Cliente", {
		id : {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true,
			},
			allowNull: false,
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		historial_de_compras: {
			type: DataTypes.JSON, // mi idea es que sea un array de obj's -> [{name_produto : 'Compu', ....etc}, ....etc]
			allowNull: false,
		},
	});
};
