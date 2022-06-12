const { Router } = require("express");
const { Pedido } = require("../../../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const getPedidios = await Pedido.findAll();
    if (!getPedidios) {
      const error = new Error("No hay pedidos actualmente");
      return res.status(400).json({ msg: error.message });
    }
    res.json(getPedidios.length > 0 ? getPedidios : "No hay ordenes");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
