const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define("Categoria", {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        nombre : {
            type: DataTypes.STRING,
            allowNull:false,
        },
    },
    { timestamps: false })
}