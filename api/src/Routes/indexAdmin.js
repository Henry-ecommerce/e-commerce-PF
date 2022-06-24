const { Router } = require("express");
const agregarProducto = require("./controllers/admin_productos/agregarProductos");
const obtenerProducto = require("./controllers/admin_productos/obtenerProductos");
const updateModificarProducto = require("./controllers/admin_productos/updateProductos");
const borrarBorrarProducto = require("./controllers/admin_productos/borrarProductos");
const getUsers = require("./controllers/admin_productos/getUsers");
const getCategorias = require("./controllers/admin_productos/categoriasProduc");
const getOrdenes = require("./controllers/admin_productos/ordenes");
const getventas = require("./controllers/admin_productos/ventas");
const getTransacciones = require("./controllers/admin_productos/transaciones");
const hardCodeoPedidos = require("../Routes/controllers/user_cuenta/hardCodePedidos");
const ban = require("../Routes/controllers/Owener/ban");
const updateRango = require("../Routes/controllers/Owener/updateRol");
const getperfilUse = require("../Routes/controllers/Owener/perfilUser");
const comprasUsuario = require("../Routes/controllers/user_cuenta/comprasUsuario");
const PedidosAdmin = require("./controllers/user_cuenta/pedidosAdmin");

const { checkAuth } = require("../middleware/authMiddleware");
const {
  checkRolAdminMiddleware,
} = require("../middleware/checkRolAdminMiddleware");

const router = Router();

router.use("/ban", [checkAuth, checkRolAdminMiddleware], ban);
router.use("/update-rango", [checkAuth, checkRolAdminMiddleware], updateRango);
router.use("/perfilUser", [checkAuth, checkRolAdminMiddleware], getperfilUse);
router.use("/users", [checkAuth, checkRolAdminMiddleware], getUsers);
router.use("/ordenes", [checkAuth, checkRolAdminMiddleware], getOrdenes);
router.use("/ventas", [checkAuth, checkRolAdminMiddleware], getventas);
router.use(
  "/transacciones",
  [checkAuth, checkRolAdminMiddleware],
  getTransacciones
);
router.use("/categorias", [checkAuth, checkRolAdminMiddleware], getCategorias);
router.use("/crear", [checkAuth, checkRolAdminMiddleware], agregarProducto);
router.use("/obtener", [checkAuth, checkRolAdminMiddleware], obtenerProducto);
router.use("/pedidos", hardCodeoPedidos);
router.use("/envios", PedidosAdmin);
router.use(
  "/modificar",
  [checkAuth, checkRolAdminMiddleware],
  updateModificarProducto
);
router.use("/hola", [checkAuth, checkRolAdminMiddleware], comprasUsuario);
router.use(
  "/borrar",
  [checkAuth, checkRolAdminMiddleware],
  borrarBorrarProducto
);
router.use('/pedidosAdmin',pedidosAdmin)

module.exports = router;
