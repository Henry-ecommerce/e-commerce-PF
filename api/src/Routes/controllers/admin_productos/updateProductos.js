const { Router } = require("express");
const { Producto } = require("../../../db");

const router = Router();

router.put("/:id", async (req, res) => {
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
  const { id } = req.params;
  const obtenerProducto = await Producto.findByPk(id);
  if (!obtenerProducto) {
    const error = new Error("El producto no se encontro");
    return res.status(400).json({ msg: error.message });
  }
  obtenerProducto.nombre = nombre || obtenerProducto.nombre;
  obtenerProducto.marca = marca || obtenerProducto.marca;
  obtenerProducto.precio = precio || obtenerProducto.precio;
  obtenerProducto.caracteristicas =
    caracteristicas || obtenerProducto.caracteristicas;
  obtenerProducto.funciones = funciones || obtenerProducto.funciones;
  obtenerProducto.stock = stock || obtenerProducto.stock;
  obtenerProducto.categoria = categoria || obtenerProducto.categoria;
  obtenerProducto.imagen0 = imagen0 || obtenerProducto.imagen0;
  obtenerProducto.imagen1 = imagen1 || obtenerProducto.imagen1;
  obtenerProducto.imagen2 = imagen2 || obtenerProducto.imagen2;
  const actualizarPRoducto = await obtenerProducto.save();
  res.status(202).json(actualizarPRoducto);
});

module.exports = router;
