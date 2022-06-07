const { Router } = require("express");
const agregarCarrito = require("./controllers/user_cuenta/carrito");
const obtenerPerfil = require("./controllers/user_cuenta/perfil");
const Tienda = require("./controllers/user_cuenta/tienda");
const Pago = require("./controllers/user_cuenta/tienda");
const { checkAuth } = require("../middleware/authMiddleware");
const {
  checkRolUserMiddleware,
} = require("../middleware/checkRolUserMiddleware");

const router = Router();

router.use("/tienda", [checkAuth, checkRolUserMiddleware], agregarCarrito);
router.use("/carrito", [checkAuth, checkRolUserMiddleware], obtenerPerfil);
router.use("/perfil", [checkAuth, checkRolUserMiddleware], Tienda);
router.use("/pagos", [checkAuth, checkRolUserMiddleware], Pago);

module.exports = router;
