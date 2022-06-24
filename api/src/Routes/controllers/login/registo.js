const { Router } = require("express");
const bcrypt = require("bcrypt");
const { Usuario } = require("../../../db");
const { emailRegistro } = require("../../../helpers/emailRegistro");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, apellido, fecha_nacimiento, email, password, rol, img } =
      req.body;
    //Previene usuarios registrados
    const existeUsuario = await Usuario.findOne({
      where: { email },
    });
    if (existeUsuario) {
      const error = new Error("El correo ya existe");
      return res.status(400).json({ msg: error.message });
    } else {
      //Hash pass
      const salt = await bcrypt.genSalt(10);
      const passCheta = (req.body.password = await bcrypt.hash(
        req.body.password,
        salt
      ));
      //Crea nuevo user
      const newUser = await Usuario.create({
        name,
        email,
        apellido,
        fecha_nacimiento,
        password: passCheta,
        rol, /// Solo por pruebas
        img,
      });

      emailRegistro({
        email,
        name,
        token: newUser.token,
      });

      res.json(newUser);
    }
  } catch (error) {
    res.status(400).send(`El correo ya existe ${error}`);
  }
});

module.exports = router;
