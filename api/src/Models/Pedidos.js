const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pedido", {
    preference_id: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    estado_envio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "creado",
    },
    payments: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    shipments: {
      type: DataTypes.JSONB,
      
    },
    payer: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};
