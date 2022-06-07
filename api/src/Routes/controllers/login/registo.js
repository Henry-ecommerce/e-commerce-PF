const { Router } = require("express");
const bcrypt = require("bcrypt");
const { Registro } = require("../../../db");
const { emailRegistro } = require("../../../helpers/emailRegistro");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Previene usuarios registrados
    const existeUsuario = await Registro.findOne({
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
      const newVeterinario = await Registro.create({
        name,
        email,
        password: passCheta,
      });

      emailRegistro({
        email,
        name,
        token: newVeterinario.token,
      });

      res.json(newVeterinario);
    }
  } catch (error) {
    res.status(400).send(`El correo ya existe ${error}`);
  }
});

module.exports = router;
