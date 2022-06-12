const { Router } = require("express");
const { Producto } = require("../../../db");
const { Op } = require("sequelize");
const route = Router();

route.get("/", async (req, res) => {
  const { nombre } = req.query;
  console.log(nombre);
  try {
    if (nombre) {
      const producto = await Producto.findAll({
        where: {
          nombre: {
            [Op.iLike]: "%" + nombre + "%",
          },
        },
      });
      if (!producto) {
        res.status(404).json({ msg: "Producto no encontrado" });
      }

      res.json(producto);
    } else {
      const productos = await Producto.findAll();

      if (!productos) {
        const error = new Error("No hay productos");
        return res.status(400).json({ msg: error.message });
      }
      res.json(productos);
    }
  } catch (error) {
    console.log({ msg: error.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.log({ msg: error.message });
  }
});

module.exports = route;
