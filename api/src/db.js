require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT, NODE_ENV, DB_PORT } =
  process.env;

const pedidos_model = require("./Models/Pedidos");
const productos_model = require("./Models/Productos");
const usuario_model = require("./Models/Usuario");
const categoria_model = require("./Models/Categorias");
const hitorial_model = require("./Models/Historial_compras");
const reviews_model = require("./Models/Reviews");
const botclave_model = require("./Models/Bot_clave_respuesta");
const botopcion_model = require("./Models/Bot_opcion_respuesta");

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
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

usuario_model(sequelize);
pedidos_model(sequelize);
productos_model(sequelize);
reviews_model(sequelize);
categoria_model(sequelize);
hitorial_model(sequelize);
botclave_model(sequelize);
botopcion_model(sequelize);

const {
  Usuario,
  Producto,
  Pedido,
  Review,
  Historial,
  Categoria,
  BotClave,
  BotOpcion,
} = sequelize.models;

Usuario.hasMany(Pedido);
Pedido.hasOne(Usuario);

Usuario.hasMany(Historial);
Historial.hasOne(Usuario);

Usuario.hasMany(Review);
Review.belongsTo(Usuario);
Producto.hasMany(Review);
Review.belongsTo(Producto);

Usuario.belongsToMany(Producto, { through: "Favoritos" });
Producto.belongsToMany(Usuario, { through: "Favoritos" });

Producto.belongsToMany(Categoria, { through: "Categoria_Productos" });
Categoria.belongsToMany(Producto, { through: "Categoria_Productos" });
Pedido.hasMany(Producto);
Producto.hasMany(Pedido);

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
