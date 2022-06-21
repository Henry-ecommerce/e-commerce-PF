const { Router } = require("express");
const { Usuario } = require("../../../db");
const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { name, apellido, password, img, direccion } = req.body;
  console.log(req.body);
  const usuarioEsta = await Usuario.findByPk(id);
  if (!usuarioEsta) {
    const error = new Error("Algo salio mal");
    return res.json({ msg: error.message });
  }
  try {
    usuarioEsta.name = name || usuarioEsta.name;
    usuarioEsta.apellido = apellido || usuarioEsta.apellido;
    usuarioEsta.password = password || usuarioEsta.password;
    usuarioEsta.img = img || usuarioEsta.img;
    usuarioEsta.direccion = direccion || usuarioEsta.direccion;
    usuarioEsta.name = name || usuarioEsta.name;
    usuarioEsta.save();

    res.status(202).json({ msg: "Actualizacion correcta" });
  } catch (error) {
    return res.status(400).json({ msg: `Ocurrio un errer ${error.message}` });
  }
});

module.exports = router;
