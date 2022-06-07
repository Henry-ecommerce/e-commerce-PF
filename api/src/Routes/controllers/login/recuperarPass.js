const { Router } = require("express");
const { Registro } = require("../../../db");
const bcrypt = require("bcrypt");
const { generarId } = require("../../../helpers/generarId");
const { recuperarContra } = require("../../../helpers/emailRecuperarPass");

const router = Router();
//Buscamos por email para cambio de pass
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const exiteEmail = await Registro.findOne({
      where: {
        email,
      },
    });
    if (!exiteEmail) {
      const error = new Error("Email no valido");
      return res.status(400).json({ msg: error.message });
    }
    //asingnamos nuevo token
    exiteEmail.token = generarId();
    await exiteEmail.save();
    recuperarContra({
      email,
      nombre: exiteEmail.nombre,
      token: exiteEmail.token,
    });
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
});
//validamos que el token sea valido
router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const tokenValido = await Registro.findOne({
      where: {
        token,
      },
    });

    if (tokenValido) {
      res.json({ msg: "Token valido y el usuario existe" });
    } else {
      const error = new Error("Token no valido");
      return res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
});
//cambiamos contraseña
router.post("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const userCambioDePass = await Registro.findOne({
      where: {
        token,
      },
    });
    //hash new passs
    const salt = await bcrypt.genSalt(10);
    const passCheta = (req.body.password = await bcrypt.hash(
      req.body.password,
      salt
    ));

    if (userCambioDePass) {
      userCambioDePass.token = null;
      userCambioDePass.password = passCheta;
      await userCambioDePass.save();
      return res.json({ msg: "Contraseña cambiada correctamente" });
    } else {
      const error = new Error("Token invalido");
      return res.status(404).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
