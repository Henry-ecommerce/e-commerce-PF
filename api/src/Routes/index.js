const { Router } = require("express");
const Productos = require("./Admin/Productos");
const Filters = require("./Filters/indexFilters")
const Review = require("./Review/review.router.js")

const router = Router();

router.use("/productos", Productos);
router.use("/filter", Filters) // filtros y ORDENAMIENTOS
router.use("/review", Review); // POST Y GET de Reviews

module.exports = router;
