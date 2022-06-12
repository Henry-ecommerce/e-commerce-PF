const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const { registro } = req;
  res.json(registro);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { name, apellido, email, img, fecha_nacimento, direccion } = req.body;

  const userPut = await Usuario.findByPk(id);

  if (!userPut) {
    const error = new Error("No se encontro doctor");
    return res.status(400).json({ msg: error.message });
  }
  if (userPut.email !== email) {
    const existeEmail = await Usuario.findOne({
      where: {
        email,
      },
    });
    if (existeEmail) {
      const error = new Error("El correo ya existe");
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    userPut.name = name || userPut.name;
    userPut.apellido = apellido || userPut.apellido;
    userPut.email = email || userPut.email;
    userPut.img = img || userPut.img;
    userPut.fecha_nacimento = fecha_nacimento || userPut.fecha_nacimento;
    userPut.direccion = direccion || userPut.direccion;

    const userActualizado = await userPut.save();
    res.json(userActualizado);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
