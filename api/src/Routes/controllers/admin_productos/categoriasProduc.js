const { Router } = require("express");
const { Categoria } = require("../../../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const getCategotias = await Categoria.findAll();
    if (!getCategotias) {
      const error = new Error("Categorias no disponibles");
      return res.status(400).json({ msg: error.message });
    }
    res.json(getCategotias.length > 0 ? getCategotias : "No hay categorias");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
