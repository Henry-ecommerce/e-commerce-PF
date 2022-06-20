const { Router } = require("express");

const Carrito = require("./controllers/user_cuenta/carrito");
const obtenerPerfil = require("./controllers/user_cuenta/perfil");
const Tienda = require("./controllers/user_cuenta/tienda");
const Pago = require("./controllers/user_cuenta/pago");
const Favoritos = require("./Favoritos/Favoritos");
const Compras = require("./controllers/user_cuenta/compras");
const comprasUsuario = require("./controllers/user_cuenta/comprasUsuario");
const { checkAuth } = require("../middleware/authMiddleware");
const {
  checkRolUserMiddleware,
} = require("../middleware/checkRolUserMiddleware");

const router = Router();

router.use("/carrito", [checkAuth, checkRolUserMiddleware], Carrito);
router.use("/perfil", [checkAuth, checkRolUserMiddleware], obtenerPerfil);
// router.use("/perfil", [checkAuth, checkRolUserMiddleware], Tienda);
router.use("/pago", [checkAuth, checkRolUserMiddleware], Pago);
router.use("/favoritos", [checkAuth, checkRolUserMiddleware], Favoritos);
router.use("/compras", Compras);
router.use("/pedido", [checkAuth, checkRolUserMiddleware], comprasUsuario);

module.exports = router;
