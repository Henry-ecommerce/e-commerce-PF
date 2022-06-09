const { Router } = require("express");
const { Producto } = require("../../../db");
const route = Router();

route.get("/", async (req, res) => {
  const productos = await Producto.findAll();
  if (!productos) {
    const error = new Error("No hay productos");
    return res.status(400).json({ msg: error.message });
  }
  res.json({ productos });
});

module.exports = route;
