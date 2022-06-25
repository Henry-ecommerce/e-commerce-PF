const { Router } = require("express");
const { Usuario, Pedido } = require("../../../db");
const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const buscarUser = await Usuario.findByPk(id, {
    exclude: ["password"],
    include: Pedido,
  });
  if (!buscarUser) {
    const error = new Error("Algo salio mal Id no valido");
    return res.json({ msg: error.message });
  }
  try {
    res.json(buscarUser);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
