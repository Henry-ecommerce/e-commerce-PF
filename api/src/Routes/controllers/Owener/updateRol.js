const { Router } = require("express");
const { Usuario } = require("../../../db");

const router = Router();

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { rols } = req.body;

  const obtenerUser = await Usuario.findByPk(id);

  if (!obtenerUser) {
    const error = new Error("El usuario no se encontro");
    return res.status(400).json({ msg: error.message });
  }

  if (rols === "admin") {
    obtenerUser.rol = "Admin";
    obtenerUser.save();
    return res.status(202).json({
      msg: `La cuenta con el nombre ${obtenerUser.name} ahora tiene el rol de administrador`,
    });
  } else if (rols === "user") {
    obtenerUser.rol = "User";
    obtenerUser.save();
    return res.status(202).json({
      msg: `La cuenta con el nombre ${obtenerUser.name} ahora tiene el rol de usuario`,
    });
  }
  const nuevoRol = obtenerUser.save();

  res.status(202).json(nuevoRol);
});

module.exports = router;
