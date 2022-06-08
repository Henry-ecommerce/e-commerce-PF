const { Router } = require("express");
const { Producto } = require("../../../db");

const router = Router();

router.post("/", async (req, res) => {
  const {
    nombre,
    marca,
    precio,
    caracteristicas,
    funciones,
    stock,
    categoria,
    imagen0,
    imagen1,
    imagen2,
  } = req.body;
  try {
    const addNewProducto = await Producto.create({
      nombre,
      marca,
      precio,
      caracteristicas,
      funciones,
      stock,
      categoria,
      imagen0,
      imagen1,
      imagen2,
    });

    res.status(202).json(addNewProducto);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
