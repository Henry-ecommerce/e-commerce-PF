const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Pedido", {
		forma_de_pago: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		productos_comprados: {
			type: DataTypes.JSON, // Mi idea es hacer un obj como este --> 
            /* 
                {
                    productos : [
                        {name_prod : 'Computadora', cantidad : 1, ...etc},
                        {name_prod : 'Telefono', cantidad : 2, ...etc},
                    ],
                    fecha : '30/05/2020'
                }
             */
			allowNull: false,
		},
	});
};
