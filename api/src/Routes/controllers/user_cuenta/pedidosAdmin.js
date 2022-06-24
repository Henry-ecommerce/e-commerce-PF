const { Router } = require("express");
const router = Router();
const { Usuario, Pedido, Categoria } = require("../../../db");

router.get("/", async (req, res) => {
  let pedidos = await Pedido.findAll({include : Usuario})
  
  res.json(pedidos);
});

module.exports = router;
