const { Router } = require("express");
const ban = require("./controllers/Owener/ban");
const updateRango = require("./controllers/Owener/updateRol");
const agregarProducto = require("./controllers/admin_productos/agregarProductos");
const obtenerProducto = require("./controllers/admin_productos/obtenerProductos");
const updateModificarProducto = require("./controllers/admin_productos/updateProductos");
const borrarBorrarProducto = require("./controllers/admin_productos/borrarProductos");
const getUsers = require("./controllers/admin_productos/getUsers");
const { checkAuth } = require("../middleware/authMiddleware");
const { owner } = require("../middleware/Owner");

const router = Router();

router.use("/ban", [checkAuth, owner], ban);
router.use("/update-rango", [checkAuth, owner], updateRango);
router.use("/crear", [checkAuth, owner], agregarProducto);
router.use("/obtener", [checkAuth, owner], obtenerProducto);
router.use("/modificar", [checkAuth, owner], updateModificarProducto);
router.use("/borrar", [checkAuth, owner], borrarBorrarProducto);
router.use("/usuarios", [checkAuth, owner], getUsers);

module.exports = router;
