const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("Pedido", {
		id : {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
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
			/* los modelos no pueden recibir arrays, hay 2 formas de lograr esto, con un get() para devolverlo de esa forma,
			o crear una relacion para poder solicitar los productos asociados a este pedido. 
			Leo. fecha 7/06/2022 perdon por llegar casi 2 años tarde bro*/
			allowNull: false,
		},
	});
};
