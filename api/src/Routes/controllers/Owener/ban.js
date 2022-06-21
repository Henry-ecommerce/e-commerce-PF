const { Router } = require("express");
const { Usuario } = require("../../../db");
const router = Router();

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { baneo } = req.body;
  console.log(id);
  const useBaneoRico = await Usuario.findByPk(id);
  if (!useBaneoRico) {
    const error = new Error("El usuario no se encotro");
    return res.status(400).json({ msg: error.message });
  }
  try {
    if (baneo === "desbaneo") {
      useBaneoRico.baneo = false;
      useBaneoRico.save();
      return res.json({ msg: "Cuenta desbaneada correctamente" });
    } else if (baneo === "baneo") {
      useBaneoRico.baneo = true;
      useBaneoRico.save();
      return res.json({ msg: "Cuenta baneada correctamente" });
    }
  } catch (error) {
    res.status(400).json({ msg: `Peticion no valida ${error.message}` });
  }
});

module.exports = router;
