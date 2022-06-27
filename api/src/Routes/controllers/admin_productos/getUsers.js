const { Router } = require("express");
const { Usuario, Pedido } = require("../../../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const getUsers = await Usuario.findAll({include: Pedido});
    if (!getUsers) {
      const error = new Error("No se encontraron usuarios");
      return res.status(400).json({ msg: error.message });
    }
    res.json(getUsers);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
