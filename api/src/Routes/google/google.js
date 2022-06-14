const router = require("express").Router();
const { Usuario } = require("../../db");
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

    if (!existeUsuario) {
      console.log("Hola");
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
    res.json({ msg: "Correo registrado o logueado con google" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
