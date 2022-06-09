const { Router } = require("express");
const { Producto } = require("../../../db");

const router = Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== "numero") {
      const error = new Error("El id debe de ser un numero");
      return res.status(404).json({ msg: error.message });
    }
    const borrar = await Producto.destroy({
      where: {
        id,
      },
    });

    return res.json({ msg: "producto eliminado correctamente" });
  } catch (error) {}
});

module.exports = router;
