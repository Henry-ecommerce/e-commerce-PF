const { Router } = require("express");
const bcrypt = require("bcrypt");
const { Registro } = require("../../../db");
const { generarJWT } = require("../../../helpers/generarJWT");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Busca el user
    const userExite = await Registro.findOne({
      where: { email },
    });
    if (!userExite) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    if (!userExite.confirmado) {
      const error = new Error("Tu cuenta no se confirmo");
      return res.status(403).json({ msg: error.message });
    }
    // Comprobar passfrom con pass hash
    comprobarPassword = async function (passwordForm, hash) {
      return bcrypt.compareSync(passwordForm, hash);
    };

    if (await comprobarPassword(password, userExite.password)) {
      //autenticar -JWT
      res.json({
        token: generarJWT(userExite.id),
      });
    } else {
      return res.status(403).json({ msg: "Password incorrecto" });
    }
  } catch (error) {
    res.status(404).json({ msg: `Error el usuario no existe ${error}` });
  }
});

module.exports = router;