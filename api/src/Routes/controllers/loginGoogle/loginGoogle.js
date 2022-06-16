const router = require("express").Router();
const { Usuario } = require("../../../db");
router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      apellido,
      password,
      email,
      img,
      fecha_nacimiento,
      rol,
      token,
      confirmado,
    } = req.body;
    const existeUsuario = await Usuario.findOne({
      where: { email },
    });
    console.log(existeUsuario);
    if (!existeUsuario) {
      console.log("Se agrego correctamente");
      const newUser = await Usuario.create({
        name,
        apellido,
        password,
        email,
        img,
        fecha_nacimiento,
        rol,
        token,
        confirmado,
      });
      res.json(newUser);
    }
    res.json(existeUsuario);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
