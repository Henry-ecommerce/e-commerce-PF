const { Router } = require("express");
const Productos = require("./Admin/Productos");
const Pedidos = require("./Admin/Pedidos");
const Filters = require("./Filters/indexFilters")
const Review = require("./Review/review.router.js")
const Categorias = require("./Categories/indexCategories")
const Chatbot = require("./Chatbot/Chatbot")
const router = Router();

router.use("/productos", Productos);
router.use("/filter", Filters) // filtros y ORDENAMIENTOS
router.use("/review", Review); // POST Y GET de Reviews
router.use("/categorias", Categorias);
router.use("/chatbot", Chatbot);
router.use("/pedidos", Pedidos);

module.exports = router;
