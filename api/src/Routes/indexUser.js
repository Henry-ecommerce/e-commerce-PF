const { Router } = require("express");
const agregarProducto = require("./controllers/admin_productos/agregarProductos");
const obtenerProducto = require("./controllers/admin_productos/obtenerProductos");
const updateModificarProducto = require("./controllers/admin_productos/updateProductos");

const { checkAuth } = require("../middleware/authMiddleware");

const router = Router();

router.use("/tienda", checkAuth, agregarProducto);
router.use("/carrito", checkAuth, obtenerProducto);
router.use("/perfil", checkAuth, updateModificarProducto);
//router.use("/pagos", checkAuth, borrarBorrarProducto);

module.exports = router;
