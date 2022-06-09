const { Router } = require("express");
const { Registro } = require("../../../db");

const router = Router();

router.put("/:id", async (req, res) => {
  const { rol } = req.body;
  const { id } = req.params;
  const obtenerUser = await Registro.findByPk(id);

  if (!obtenerUser) {
    const error = new Error("El usuario no se encontro");
    return res.status(400).json({ msg: error.message });
  }
  obtenerUser.rol = rol;
  const nuevoRol = obtenerUser.save();

  res.status(202).json(nuevoRol);
});

module.exports = router;
