const router = require("express").Router();
const { generarJWT } = require("../../../helpers/generarJWT");
const { Usuario } = require("../../../db");
router.post("/", async (req, res, next) => {
  console.log(req.body);
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

      //console.log(`soy yo nuevo`, generarJWT(newUser));
      res.json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol,
        token: generarJWT(newUser),
        img: newUser.img,
        direccion: newUser.direccion,
        fecha_nacimiento: newUser.fecha_nacimiento,
        apellido: newUser.apellido,
      });
    } else {
      //console.log(`soy yo viejo`, generarJWT(existeUsuario));
      res.json({
        id: existeUsuario.id,
        name: existeUsuario.name,
        email: existeUsuario.email,
        rol: existeUsuario.rol,
        token: generarJWT(existeUsuario),
        img: existeUsuario.img,
        direccion: existeUsuario.direccion,
        fecha_nacimiento: existeUsuario.fecha_nacimiento,
        apellido: existeUsuario.apellido,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
