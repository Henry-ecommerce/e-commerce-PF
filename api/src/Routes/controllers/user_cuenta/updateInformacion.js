const { Router } = require("express");
const { Usuario } = require("../../../db");
const router = Router();

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { name, apellido, fecha_nacimiento, direccion, img, email } = req.body;

  const usuarioEsta = await Usuario.findByPk(id);
  if (!usuarioEsta) {
    const error = new Error("Algo salio mal");
    return res.json({ msg: error.message });
  }
  try {
    if (email) {
      const correExite = await Usuario.findOne({
        where: {
          email,
        },
      });

      if (!correExite) {
        usuarioEsta.name = name || usuarioEsta.name;
        usuarioEsta.apellido = apellido || usuarioEsta.apellido;
        usuarioEsta.fecha_nacimiento = fecha_nacimiento || usuarioEsta.apellido;
        usuarioEsta.email = email || usuarioEsta.email;
        usuarioEsta.img = img;
        usuarioEsta.direccion = direccion || usuarioEsta.direccion;
        usuarioEsta.name = name || usuarioEsta.name;
        await usuarioEsta.save();
        return res.status(202).json(usuarioEsta);
      } else {
        usuarioEsta.name = name || usuarioEsta.name;
        usuarioEsta.apellido = apellido || usuarioEsta.apellido;
        usuarioEsta.fecha_nacimiento = fecha_nacimiento || usuarioEsta.apellido;
        usuarioEsta.img = img;
        usuarioEsta.direccion = direccion || usuarioEsta.direccion;
        usuarioEsta.name = name || usuarioEsta.name;
        await usuarioEsta.save();

        res.status(202).json(usuarioEsta);
      }
    }
  } catch (error) {
    return res.status(400).json({ msg: `Ocurrio un errer ${error.message}` });
  }
});

module.exports = router;
