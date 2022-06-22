const { Router } = require("express");
const { Usuario } = require("../../../db");

const router = Router();
//confirmacion de cuenta
router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const usuarioConfirmar = await Usuario.findOne({
      where: {
        token,
      },
    });

    if (!usuarioConfirmar) {
      const error = new Error("Vuelva a intentar tokenn no valido");
      return res.status(400).json({ msg: error.message });
    }
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    return res.json({ msg: "Cuenta confirmada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: `Peticion no valida ${error.message}` });
  }
});

module.exports = router;
