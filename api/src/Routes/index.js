const { Router } = require("express");
const Productos = require("./Admin/Productos");

const router = Router()

router.use('/productos', Productos)

module.exports = router;