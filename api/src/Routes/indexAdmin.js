const { Router } = require("express");
const agregarProducto = require("./controllers/admin_productos/agregarProductos");
const obtenerProducto = require("./controllers/admin_productos/obtenerProductos");
const updateModificarProducto = require("./controllers/admin_productos/updateProductos");
const borrarBorrarProducto = require("./controllers/admin_productos/borrarProductos");
const agregarCarrito = require("./controllers/user_cuenta/carrito");
const obtenerPerfil = require("./controllers/user_cuenta/perfil");
const Tienda = require("./controllers/user_cuenta/tienda");
const Pago = require("./controllers/user_cuenta/tienda");

const { checkAuth } = require("../middleware/authMiddleware");
const {
  checkRolAdminMiddleware,
} = require("../middleware/checkRolAdminMiddleware");

const router = Router();

router.use("/crear", [checkAuth, checkRolAdminMiddleware], agregarProducto);
router.use("/obtener", [checkAuth, checkRolAdminMiddleware], obtenerProducto);
router.use(
  "/modificar",
  [checkAuth, checkRolAdminMiddleware],
  updateModificarProducto
);
router.use(
  "/borrar",
  [checkAuth, checkRolAdminMiddleware],
  borrarBorrarProducto
);
router.use("/tienda", [checkAuth, checkRolAdminMiddleware], agregarCarrito);
router.use("/carrito", [checkAuth, checkRolAdminMiddleware], obtenerPerfil);
router.use("/perfil", [checkAuth, checkRolAdminMiddleware], Tienda);

router.use("/pagos", [checkAuth, checkRolAdminMiddleware], Pago);

module.exports = router;