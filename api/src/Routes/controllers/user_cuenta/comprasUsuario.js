const { Router } = require("express");
const router = Router();
const { Usuario, Pedido } = require("../../../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let usuario = await Usuario.findByPk(id, {
    exclude: ["password"],
    include: Pedido,
  });

  res.json(usuario.Pedidos);
});

module.exports = router;
