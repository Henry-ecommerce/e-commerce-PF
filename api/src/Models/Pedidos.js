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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payments: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    shipments: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    payer: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};
