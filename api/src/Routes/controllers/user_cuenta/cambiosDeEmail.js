const { Router } = require("express");
const { Usuario } = require("../../../db");
const router = Router();

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const usuarioEsta = await Usuario.findByPk(id);
  if (!usuarioEsta) {
    const error = new Error("Algo salio mal");
    return res.json({ msg: error.message });
  }

  const usuarioEmail = await Usuario.findOne({
    where: {
      email,
    },
  });

  try {
    if (!usuarioEmail) {
      usuarioEsta.email = email;
      usuarioEsta.save();
      return res.json({ msg: "Cambio de correo existoso" });
    } else {
      const error = new Error("Correo existente, prueba con otro correor");
      return res.json({ msg: error.message });
    }
  } catch (error) {
    return res.status(400).json({ msg: `Ocurrio un errer ${error.message}` });
  }
});

module.exports = router;
