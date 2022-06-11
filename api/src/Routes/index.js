const { Router } = require("express");
const Productos = require("./Admin/Productos");
const Filters = require("./Filters/indexFilters")
const Categorias = require("./Categories/indexCategories")
const router = Router();

router.use("/productos", Productos);
router.use("/filter", Filters) // filtros y ORDENAMIENTOS
router.use("/categorias", Categorias);


module.exports = router;
