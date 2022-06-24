const { Router } = require("express");
const router = Router();
const { Usuario, Pedido } = require("../../../db");
const { emailCompraCompletada } = require("../../../helpers/emailCompraCompletada");

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
  
  if(estado === "Completado"){
    emailCompraCompletada({
      email: pedidos.payer.email,
      name: pedidos.payer.name,
    });
  }
  
  pedidos.estado_envio = estado;
  await pedidos.save();
  res.json(pedidos);
});

module.exports = router;
