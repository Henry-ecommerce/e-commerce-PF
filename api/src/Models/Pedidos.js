const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pedido", {
    preference_id: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    estado_envio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payments: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    shipments: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    payer: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
};
