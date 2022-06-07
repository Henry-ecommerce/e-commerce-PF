const { Router } = require("express");
const agregarProducto = require("./controllers/admin_productos/agregarProductos");
const obtenerProducto = require("./controllers/admin_productos/obtenerProductos");
const updateModificarProducto = require("./controllers/admin_productos/updateProductos");
const borrarBorrarProducto = require("./controllers/admin_productos/borrarProductos");
const { checkAuth } = require("../middleware/authMiddleware");

const router = Router();

router.use("/crear", checkAuth, agregarProducto);
router.use("/obtener", checkAuth, obtenerProducto);
router.use("/modificar", checkAuth, updateModificarProducto);
router.use("/borrar", checkAuth, borrarBorrarProducto);

module.exports = router;
