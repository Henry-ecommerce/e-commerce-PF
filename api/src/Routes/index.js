const { Router } = require("express");
const Productos = require("./Admin/Productos");
const Filters = require("./Filters/indexFilters")

const router = Router();

router.use("/productos", Productos);
router.use("/filter", Filters) // filtros y ORDENAMIENTOS


module.exports = router;
