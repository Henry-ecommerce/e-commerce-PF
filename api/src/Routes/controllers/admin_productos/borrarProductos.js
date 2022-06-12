const { Router } = require("express");
const { Producto } = require("../../../db");

const router = Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id === "string" || NaN) {
      const error = new Error("El id debe de ser un numero");
      return res.status(404).json({ msg: error.message });
    }
    await Producto.destroy({
      where: {
        id,
      },
    });

    return res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error.message);
    return res.json({ msg: error.message });
  }
});

module.exports = router;
