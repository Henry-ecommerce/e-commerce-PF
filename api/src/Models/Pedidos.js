const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Pedido", {
		forma_de_pago: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
