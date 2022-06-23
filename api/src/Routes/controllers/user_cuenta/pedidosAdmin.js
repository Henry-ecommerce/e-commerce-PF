const { Router } = require("express");
const router = Router();
const { Usuario, Pedido } = require("../../../db");

router.get("/", async (req, res) => {
  let pedidos = await Pedido.findAll({
    include: Usuario,
    order: [["id", "DESC"]],
  });
  res.json(pedidos);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let pedidos = await Pedido.findByPk(id);
  res.json(pedidos);
});

router.put("/:id", async (req, res) => {
  let { estado } = req.body;
  let { id } = req.params;
  let pedidos = await Pedido.findByPk(id);

  pedidos.estado_envio = estado;
  res.json(pedidos);
});

module.exports = router;
