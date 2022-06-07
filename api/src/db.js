require("dotenv").config();
const { Sequelize } = require("sequelize");
const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_NAME,
	PORT,
	NODE_ENV,
} = process.env


const clientes_model = require("./Models/Clientes");
const pedidos_model = require("./Models/Pedidos");
const productos_model = require("./Models/Productos");

let sequelize =
	NODE_ENV === "production"
		? new Sequelize({
				database: DB_NAME,
				dialect: "postgres",
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
				{
					logging: false, // set to console.log to see the raw SQL queries
					native: false, // lets Sequelize know we can use pg-native for ~30% more speed
				}
		  );


clientes_model(sequelize)
pedidos_model(sequelize)
productos_model(sequelize)

const { Cliente, Producto, Pedido } = sequelize.models;

Cliente.belongsToMany(Producto, { through : 'Producto_Cliente'})
Producto.belongsToMany(Cliente, { through : 'Producto_Cliente'})

Cliente.hasMany(Pedido)
// Pedido.hasMany(Cliente)

module.exports = {
    ...sequelize.models,
    db : sequelize
}