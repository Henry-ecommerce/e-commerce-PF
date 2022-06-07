const { Router } = require("express");
const { Producto } = require("../../../db");

const router = Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const borrar = await Producto.destroy({
      where: {
        id,
      },
    });

    return res.json({ msg: "producto eliminado correctamente" });
  } catch (error) {}
});

module.exports = router;
