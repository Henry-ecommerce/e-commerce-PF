const express = require("express");
const router = express.Router();
const { Usuario, Producto } = require("../../db");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const favoritos = await Usuario.findByPk(userId, { include: Producto });
    favoritos
      ? res.json(favoritos.Productos)
      : res.send("Este usuario no tiene favoritos aun ");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { productoId, userId } = req.body;
    const user = await Usuario.findByPk(userId, { include: Producto });
    user
      ?.addProducto(productoId)
      .then(
        user ? res.json('añadido con exito') : res.send("Este usuario no existe")
      );
  } catch (error) {
    console.log(error);
  }
});

router.post("/remove", async (req, res) => {
  const { productoId, userId } = req.body;
  try {
    const user = await Usuario.findByPk(userId, { include: Producto });
    user?.removeProducto(productoId);
    user? res.json('Eliminado con exito') : res.send('Este usuario no existe')
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
