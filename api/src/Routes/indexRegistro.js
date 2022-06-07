const { Router } = require("express");
const routeRegistro = require("./controllers/login/registo");
const routeLogin = require("./controllers/login/login");
const routerConfirmar = require("./controllers/login/confirmarPass");
const routerRecupear = require("./controllers/login/recuperarPass");
const routerPerfil = require("./controllers/login/perfil");
const { checkAuth } = require("../middleware/authMiddleware");

const router = Router();

router.use("/cliente", routeRegistro);
router.use("/cliente/login", routeLogin);
router.use("/confirmar", routerConfirmar);
router.use("/cambioPasss", routerRecupear);

//area privada
router.use("/perfil", checkAuth, routerPerfil);

module.exports = router;