const { Router } = require("express");
const ban = require("./controllers/Owener/ban");
const updateRango = require("./controllers/Owener/updateRol");
const agregarProducto = require("./controllers/admin_productos/agregarProductos");
const obtenerProducto = require("./controllers/admin_productos/obtenerProductos");
const updateModificarProducto = require("./controllers/admin_productos/updateProductos");
const borrarBorrarProducto = require("./controllers/admin_productos/borrarProductos");
const agregarCarrito = require("./controllers/user_cuenta/carrito");
const obtenerPerfil = require("./controllers/user_cuenta/perfil");
const Tienda = require("./controllers/user_cuenta/tienda");
const Pago = require("./controllers/user_cuenta/tienda");
const { checkAuth } = require("../middleware/authMiddleware");
const { owner } = require("../middleware/Owner");

const router = Router();

router.use("/ban", [checkAuth, owner], ban);
router.use("/update-rango", [checkAuth, owner], updateRango);
router.use("/crear", [checkAuth, owner], agregarProducto);
router.use("/obtener", [checkAuth, owner], obtenerProducto);
router.use("/modificar", [checkAuth, owner], updateModificarProducto);
router.use("/borrar", [checkAuth, owner], borrarBorrarProducto);
router.use("/tienda", [checkAuth, owner], agregarCarrito);
router.use("/carrito", [checkAuth, owner], obtenerPerfil);
router.use("/perfil", [checkAuth, owner], Tienda);

router.use("/pagos", [checkAuth, owner], Pago);

module.exports = router;
